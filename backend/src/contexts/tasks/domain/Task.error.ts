import { DomainError } from '../../shared/domain';
import { TaskMessage } from './Task.message';

export class TaskError extends DomainError<TaskMessage> {
    public static NotFoundIdError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('notfound', 'task.exceptions.id.notfound', args);
    }

    public static NotValidIdError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('notvalid', 'task.exceptions.id.notvalid', args);
    }

    public static NotValidTitleError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('notvalid', 'task.exceptions.title.notvalid', args);
    }

    public static TitleAlreadyExistError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('conflict', 'task.exceptions.title.already', args);
    }

    public static NotValidBodyError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('notvalid', 'task.exceptions.body.notvalid', args);
    }

    public static NotValidCreatedError<ARGS = unknown>(args?: ARGS): DomainError<TaskMessage, ARGS> {
        return this.create('notvalid', 'task.exceptions.created.notvalid', args);
    }
}
