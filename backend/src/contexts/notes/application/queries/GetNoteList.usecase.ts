import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result } from '../../../shared/domain';
import { NoteEntity, NoteRepository } from '../../domain';
import { NoteError } from '../../domain/Note.error';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GetNoteListRequest {}

type GetNoteListResponse = Result<NoteError, NoteEntity[]>;

@injectable()
export class GetNoteListUseCase implements UseCase<GetNoteListRequest, GetNoteListResponse> {
    constructor(@inject(Symbols.NoteRepository) private noteRepository: NoteRepository) {}

    async execute(): Promise<GetNoteListResponse> {
        const taskList = await this.noteRepository.readNoteList();

        if (taskList.isError) return Result.Error(taskList.getError());

        return Result.Success(taskList.getSuccess());
    }
}
