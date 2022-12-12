export interface NoteModel {
    id: string;
    title: string;
    body: string;
    created: string;
}

export interface CreateNoteDTO extends Omit<NoteModel, 'id' | 'created'> {}
