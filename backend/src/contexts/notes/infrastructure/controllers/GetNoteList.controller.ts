import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Controller } from '../../../shared/infrastructure';
import { GetNoteListUseCase } from '../../application/queries';
import { NoteMessage } from '../../domain';
import { NoteSerializer } from '../serializers';

@injectable()
export class GetNoteListController extends Controller {
    constructor(
        /* use case */
        @inject(Symbols.GetNoteListUseCase) private getNoteList: GetNoteListUseCase,
        /* serializer */
        @inject(Symbols.NoteSerializer) private noteSerializer: NoteSerializer
    ) {
        super();
    }

    protected async implementation(): Promise<void> {
        const result = await this.getNoteList.execute();

        if (result.isError) {
            const error = result.getError();

            return (this.errorResponse[error.kind] ?? this.internalServerError)(error.message, error.args);
        }

        return this.ok<NoteMessage>(
            'note.success.list',
            result.getSuccess().map(item => this.noteSerializer.fromEntityToResponse(item))
        );
    }
}
