import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Result, UniqueEntityID } from '../../../shared/domain';
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

        return Result.Success();
    }

    async readTaskList(): Promise<Result<TaskError, TaskEntity[]>> {
        const data = TaskDB.map(task => this.taskSerializer.fromModelToEntity(task));

        const foundException = Result.Combine(data);

        if (foundException.isError) return Result.Error(foundException.getError());

        return Result.Success(data.map(task => task.getSuccess()));
    }

    async readTaskById(taskId: UniqueEntityID): Promise<Result<TaskError, TaskEntity>> {
        const foundedTask = TaskDB.find(task => task.id === taskId.toString());

        if (!foundedTask) return Result.Error(TaskError.NotFoundIdError());

        const task = this.taskSerializer.fromModelToEntity(foundedTask);

        if (task.isError) return Result.Error(task.getError());

        return Result.Success(task.getSuccess());
    }

    async updateTask(task: TaskEntity): Promise<Result<TaskError, void>> {
        const foundedIndex = TaskDB.findIndex(task => task.id === task.id);

        if (foundedIndex === -1) return Result.Error(TaskError.NotFoundIdError());

        TaskDB[foundedIndex] = this.taskSerializer.fromEntityToDTO(task);

        return Result.Success();
    }
}
