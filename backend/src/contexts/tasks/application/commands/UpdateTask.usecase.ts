import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { TaskEntity, TaskRepository } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { TaskError } from '../../domain/Task.error';
import { TitleValueObject } from '../../domain/Title.value';

export interface UpdateTaskRequest {
    taskId: string;
    title: string;
    body: string;
}

type UpdateTaskResponse = Result<TaskError, void>;

@injectable()
export class UpdateTaskUseCase implements UseCase<UpdateTaskRequest, UpdateTaskResponse> {
    constructor(@inject(Symbols.TaskRepository) private taskRepository: TaskRepository) {}

    async execute(request: UpdateTaskRequest): Promise<UpdateTaskResponse> {
        const foundedTask = await this.taskRepository.readTaskById(new UniqueEntityID(request.taskId));

        if (foundedTask.isError) return Result.Error(foundedTask.getError());

        const title = TitleValueObject.create({ title: request.title });

        if (title.isError) return Result.Error(title.getError());

        if (foundedTask.getSuccess().props.title.value !== title.getSuccess().value) {
            const isTitleAvailable = await this.taskRepository.isTitleAvailable(title.getSuccess());

            if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());
        }

        const body = BodyValueObject.create({ body: request.body });

        if (body.isError) return Result.Error(body.getError());

        const task = TaskEntity.createToStore(
            {
                title: title.getSuccess(),
                body: body.getSuccess(),
                created: foundedTask.getSuccess().props.created,
            },
            foundedTask.getSuccess().id
        );

        if (task.isError) return Result.Error(task.getError());

        const updatedTask = await this.taskRepository.updateTask(task.getSuccess());

        if (updatedTask.isError) return Result.Error(updatedTask.getError());

        return Result.Success();
    }
}
