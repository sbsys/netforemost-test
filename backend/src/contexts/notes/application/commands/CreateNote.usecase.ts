import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result } from '../../../shared/domain';
import { NoteEntity, NoteRepository } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { CreatedValueObject } from '../../domain/Created.value';
import { NoteError } from '../../domain/Note.error';
import { TitleValueObject } from '../../domain/Title.value';

export interface CreateNoteRequest {
    title: string;
    body: string;
}

type CreateNoteResponse = Result<NoteError, void>;

@injectable()
export class CreateNoteUseCase implements UseCase<CreateNoteRequest, CreateNoteResponse> {
    constructor(@inject(Symbols.NoteRepository) private noteRepository: NoteRepository) {}

    async execute(request: CreateNoteRequest): Promise<CreateNoteResponse> {
        const title = TitleValueObject.create({ title: request.title });

        if (title.isError) return Result.Error(title.getError());

        const isTitleAvailable = await this.noteRepository.isTitleAvailable(title.getSuccess());

        if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());

        const body = BodyValueObject.create({ body: request.body });

        if (body.isError) return Result.Error(body.getError());

        const created = CreatedValueObject.create({ created: new Date() });

        if (created.isError) return Result.Error(created.getError());

        const task = NoteEntity.create({
            title: title.getSuccess(),
            body: body.getSuccess(),
            created: created.getSuccess(),
        });

        if (task.isError) return Result.Error(task.getError());

        const storedTask = await this.noteRepository.createNote(task.getSuccess());

        if (storedTask.isError) return Result.Error(storedTask.getError());

        return Result.Success();
    }
}
