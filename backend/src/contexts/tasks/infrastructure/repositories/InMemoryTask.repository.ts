import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Result } from '../../../shared/domain';
import { TaskEntity, TaskError, TaskRepository } from '../../domain';
import { TitleValueObject } from '../../domain/Title.value';
import { TaskModel } from '../models';
import { TaskSerializer } from '../serializers';

const TaskDB: TaskModel[] = [];

@injectable()
export class InMemoryTaskRepository implements TaskRepository {
    constructor(@inject(Symbols.TaskSerializer) private taskSerializer: TaskSerializer) {}

    async isTitleAvailable(title: TitleValueObject): Promise<Result<TaskError, void>> {
        if (TaskDB.find(task => task.title === title.value)) return Result.Error(TaskError.TitleAlreadyExistError());

        return Result.Success();
    }

    async createTask(task: TaskEntity): Promise<Result<TaskError, void>> {
        const isTitleAvailable = await this.isTitleAvailable(task.props.title);

        if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());

        TaskDB.push({ ...this.taskSerializer.fromEntityToDTO(task) });

        console.log(TaskDB);

        return Result.Success();
    }
}
