import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { CreateNoteUseCase } from '../../application/commands';
import { NoteMessage } from '../../domain';

@injectable()
export class CreateNoteController extends Controller {
    constructor(@inject(Symbols.CreateNoteUseCase) private createNote: CreateNoteUseCase) {
        super();
    }

    protected async implementation(): Promise<void> {
        const { title, body } = this.req.body;

        const result = await this.createNote.execute({ title, body });

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.created<NoteMessage>('note.success.created');
    }
}
