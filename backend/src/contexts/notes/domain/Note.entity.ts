import { Entity, Result, UniqueEntityID } from '../../shared/domain';
import { BodyValueObject } from './Body.value';
import { CreatedValueObject } from './Created.value';
import { NoteError } from './Note.error';
import { TitleValueObject } from './Title.value';

interface NoteProps {
    title: TitleValueObject;
    body: BodyValueObject;
    created: CreatedValueObject;
}

export class NoteEntity extends Entity<NoteProps> {
    public static create(props: NoteProps, id?: UniqueEntityID): Result<NoteError, NoteEntity> {
        return Result.Success(
            new NoteEntity(
                {
                    ...props,
                },
                id
            )
        );
    }

    public static createToStore(props: NoteProps, id: UniqueEntityID): Result<NoteError, NoteEntity> {
        const task = this.create(props, id);

        if (task.isError) return Result.Error(task.getError());

        return Result.Success(task.getSuccess());
    }
}
