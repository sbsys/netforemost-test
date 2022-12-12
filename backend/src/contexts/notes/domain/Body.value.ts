import { Result, ValueObject } from '../../shared/domain';
import { NoteError } from './Note.error';

interface BodyProps {
    body: string;
}

export class BodyValueObject extends ValueObject<BodyProps> {
    public get value(): string {
        return this.props.body;
    }

    public static create(props: BodyProps): Result<NoteError, BodyValueObject> {
        if (!props.body || props.body.length === 0) return Result.Error(NoteError.NotValidBodyError());

        return Result.Success(new BodyValueObject(props));
    }
}
