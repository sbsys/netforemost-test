import { DomainError } from '../../shared/domain';
import { NoteMessage } from './Note.message';

export class NoteError extends DomainError<NoteMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('notfound', 'note.exceptions.id.notfound', args);
    }

    public static NotValidIdError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('notvalid', 'note.exceptions.id.notvalid', args);
    }

    public static NotValidTitleError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('notvalid', 'note.exceptions.title.notvalid', args);
    }

    public static TitleAlreadyExistError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('conflict', 'note.exceptions.title.already', args);
    }

    public static NotValidBodyError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('notvalid', 'note.exceptions.body.notvalid', args);
    }

    public static NotValidCreatedError<ARGS = unknown>(args?: ARGS): DomainError<NoteMessage, ARGS> {
        return this.create('notvalid', 'note.exceptions.created.notvalid', args);
    }
}
