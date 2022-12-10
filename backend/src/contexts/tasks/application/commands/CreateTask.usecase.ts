import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result } from '../../../shared/domain';
import { TaskEntity, TaskRepository } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { CreatedValueObject } from '../../domain/Created.value';
import { TaskError } from '../../domain/Task.error';
import { TitleValueObject } from '../../domain/Title.value';

export interface CreateTaskRequest {
    title: string;
    body: string;
}

type CreateTaskResponse = Result<TaskError, void>;

@injectable()
export class CreateTaskUseCase implements UseCase<CreateTaskRequest, CreateTaskResponse> {
    constructor(@inject(Symbols.TaskRepository) private taskRepository: TaskRepository) {}

    async execute(request: CreateTaskRequest): Promise<CreateTaskResponse> {
        const title = TitleValueObject.create({ title: request.title });

        if (title.isError) return Result.Error(title.getError());

        const isTitleAvailable = await this.taskRepository.isTitleAvailable(title.getSuccess());

        if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());

        const body = BodyValueObject.create({ body: request.body });

        if (body.isError) return Result.Error(body.getError());

        const created = CreatedValueObject.create({ created: new Date() });

        if (created.isError) return Result.Error(created.getError());

        const task = TaskEntity.create({
            title: title.getSuccess(),
            body: body.getSuccess(),
            created: created.getSuccess(),
        });

        if (task.isError) return Result.Error(task.getError());

        const storedTask = await this.taskRepository.createTask(task.getSuccess());

        if (storedTask.isError) return Result.Error(storedTask.getError());

        return Result.Success();
    }
}
