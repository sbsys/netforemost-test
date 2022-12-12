import { isDate } from 'underscore';
import { Result, ValueObject } from '../../shared/domain';
import { NoteError } from './Note.error';

interface CreatedProps {
    created: Date;
}

export class CreatedValueObject extends ValueObject<CreatedProps> {
    public get value(): Date {
        return this.props.created;
    }

    public static create(props: CreatedProps): Result<NoteError, CreatedValueObject> {
        if (!props.created || !isDate(props.created)) return Result.Error(NoteError.NotValidCreatedError());

        return Result.Success(new CreatedValueObject(props));
    }
}
