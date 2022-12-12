import { inject, injectable } from 'inversify';
import { Symbols } from '../../../../env';
import { Result, UniqueEntityID } from '../../../shared/domain';
import { NoteEntity, NoteError, NoteRepository } from '../../domain';
import { TitleValueObject } from '../../domain/Title.value';
import { NoteModel } from '../models';
import { NoteSerializer } from '../serializers';

const NoteDB: NoteModel[] = [];

@injectable()
export class InMemoryNoteRepository implements NoteRepository {
    constructor(@inject(Symbols.NoteSerializer) private noteSerializer: NoteSerializer) {}
    async isTitleAvailable(title: TitleValueObject): Promise<Result<NoteError, void>> {
        if (NoteDB.find(task => task.title === title.value)) return Result.Error(NoteError.TitleAlreadyExistError());

        return Result.Success();
    }

    async createNote(note: NoteEntity): Promise<Result<NoteError, void>> {
        const isTitleAvailable = await this.isTitleAvailable(note.props.title);

        if (isTitleAvailable.isError) return Result.Error(isTitleAvailable.getError());

        NoteDB.push({ ...this.noteSerializer.fromEntityToDTO(note) });

        return Result.Success();
    }

    async readNoteList(): Promise<Result<NoteError, NoteEntity[]>> {
        const data = NoteDB.map(note => this.noteSerializer.fromModelToEntity(note));

        const foundException = Result.Combine(data);

        if (foundException.isError) return Result.Error(foundException.getError());

        return Result.Success(data.map(note => note.getSuccess()));
    }

    async readNoteById(noteId: UniqueEntityID): Promise<Result<NoteError, NoteEntity>> {
        const foundedNote = NoteDB.find(note => note.id === noteId.toString());

        if (!foundedNote) return Result.Error(NoteError.NotFoundIdError());

        const note = this.noteSerializer.fromModelToEntity(foundedNote);

        if (note.isError) return Result.Error(note.getError());

        return Result.Success(note.getSuccess());
    }

    async updateNote(note: NoteEntity): Promise<Result<NoteError, void>> {
        const foundedIndex = NoteDB.findIndex(currentNote => currentNote.id === note.id.toString());

        if (foundedIndex === -1) return Result.Error(NoteError.NotFoundIdError());

        NoteDB[foundedIndex] = this.noteSerializer.fromEntityToDTO(note);

        return Result.Success();
    }
}
