import { Result, ValueObject } from '../../shared/domain';
import { TaskError } from './Task.error';

interface BodyProps {
    body: string;
}

export class BodyValueObject extends ValueObject<BodyProps> {
    public get value(): string {
        return this.props.body;
    }

    public static create(props: BodyProps): Result<TaskError, BodyValueObject> {
        if (!props.body || props.body.length === 0) return Result.Error(TaskError.NotValidBodyError());

        return Result.Success(new BodyValueObject(props));
    }
}
