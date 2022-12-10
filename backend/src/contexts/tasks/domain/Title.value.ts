import { Result, ValueObject } from '../../shared/domain';
import { TaskError } from './Task.error';

interface TitleProps {
    title: string;
}

export class TitleValueObject extends ValueObject<TitleProps> {
    public get value(): string {
        return this.props.title;
    }

    public static create(props: TitleProps): Result<TaskError, TitleValueObject> {
        if (!props.title || props.title.length === 0) return Result.Error(TaskError.NotValidTitleError());

        return Result.Success(new TitleValueObject(props));
    }
}
