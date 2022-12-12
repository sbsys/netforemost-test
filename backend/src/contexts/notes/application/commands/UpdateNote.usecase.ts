import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { UseCase } from '../../../shared/application';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { NoteEntity, NoteRepository } from '../../domain';
import { BodyValueObject } from '../../domain/Body.value';
import { NoteError } from '../../domain/Note.error';
import { TitleValueObject } from '../../domain/Title.value';

export interface UpdateNoteRequest {
    noteId: string;
    title: string;
    body: string;
}

type UpdateNoteResponse = Result<NoteError, void>;

@injectable()
export class UpdateNoteUseCase implements UseCase<UpdateNoteRequest, UpdateNoteResponse> {
    constructor(@inject(Symbols.NoteRepository) private noteRepository: NoteRepository) {}

    async execute(request: UpdateNoteRequest): Promise<UpdateNoteResponse> {
        const foundedTask = await this.noteRepository.readNoteById(new UniqueEntityID(request.noteId));

        if (foundedTask.isError) return Result.Error(foundedTask.getError());

        const title = TitleValueObject.create({ title: request.title });

        if (title.isError) return Result.Error(title.getError());

        if (foundedTask.getSuccess().props.title.value !== title.getSuccess().value) {
            const isTitleAvailable = await this.noteRepository.isTitleAvailable(title.getSuccess());

            if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());
        }

        const body = BodyValueObject.create({ body: request.body });

        if (body.isError) return Result.Error(body.getError());

        const task = NoteEntity.createToStore(
            {
                title: title.getSuccess(),
                body: body.getSuccess(),
                created: foundedTask.getSuccess().props.created,
            },
            foundedTask.getSuccess().id
        );

        if (task.isError) return Result.Error(task.getError());

        const updatedTask = await this.noteRepository.updateNote(task.getSuccess());

        if (updatedTask.isError) return Result.Error(updatedTask.getError());

        return Result.Success();
    }
}
