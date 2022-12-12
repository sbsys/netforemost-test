import { Result, UniqueEntityID } from '../../shared/domain';
import { NoteEntity } from './Note.entity';
import { NoteError } from './Note.error';
import { TitleValueObject } from './Title.value';

export interface NoteRepository {
    isTitleAvailable(title: TitleValueObject): Promise<Result<NoteError, void>>;

    createNote(note: NoteEntity): Promise<Result<NoteError, void>>;

    readNoteList(): Promise<Result<NoteError, NoteEntity[]>>;

    readNoteById(noteId: UniqueEntityID): Promise<Result<NoteError, NoteEntity>>;

    updateNote(note: NoteEntity): Promise<Result<NoteError, void>>;
}
