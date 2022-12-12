import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { UpdateNoteUseCase } from '../../application/commands';
import { NoteMessage } from '../../domain';

@injectable()
export class UpdateNoteController extends Controller {
    constructor(@inject(Symbols.UpdateNoteUseCase) private updateNote: UpdateNoteUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { noteId } = this.req.params;

        if (!noteId) return this.badRequest('note.exceptions.id.notvalid' as NoteMessage);

        const { title, body } = this.req.body;

        const result = await this.updateNote.execute({ noteId, title, body });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.ok<NoteMessage>('note.success.updated');
    }
}
