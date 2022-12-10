import { Entity, Result, UniqueEntityID } from '../../shared/domain';
import { BodyValueObject } from './Body.value';
import { CreatedValueObject } from './Created.value';
import { TaskError } from './Task.error';
import { TitleValueObject } from './Title.value';

interface TaskProps {
    title: TitleValueObject;
    body: BodyValueObject;
    created: CreatedValueObject;
}

export class TaskEntity extends Entity<TaskProps> {
    public static create(props: TaskProps, id?: UniqueEntityID): Result<TaskError, TaskEntity> {
        return Result.Success(
            new TaskEntity(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToStore(props: TaskProps, id: UniqueEntityID): Result<TaskError, TaskEntity> {
        const task = this.create(props, id);

        if (task.isError) return Result.Error(task.getError());

        return Result.Success(task.getSuccess());
    }
}
