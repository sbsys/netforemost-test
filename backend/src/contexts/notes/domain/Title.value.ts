import { Result, ValueObject } from '../../shared/domain';
import { NoteError } from './Note.error';

interface TitleProps {
    title: string;
}

export class TitleValueObject extends ValueObject<TitleProps> {
    public get value(): string {
        return this.props.title;
    }

    public static create(props: TitleProps): Result<NoteError, TitleValueObject> {
        if (!props.title || props.title.length === 0) return Result.Error(NoteError.NotValidTitleError());

        return Result.Success(new TitleValueObject(props));
    }
}
