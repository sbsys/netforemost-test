import { Result, UniqueEntityID } from '../../shared/domain';
import { TaskEntity } from './Task.entity';
import { TaskError } from './Task.error';
import { TitleValueObject } from './Title.value';

export interface TaskRepository {
    isTitleAvailable(title: TitleValueObject): Promise<Result<TaskError, void>>;

    createTask(task: TaskEntity): Promise<Result<TaskError, void>>;

    readTaskList(): Promise<Result<TaskError, TaskEntity[]>>;

    readTaskById(taskId: UniqueEntityID): Promise<Result<TaskError, TaskEntity>>;

    updateTask(task: TaskEntity): Promise<Result<TaskError, void>>;
}
