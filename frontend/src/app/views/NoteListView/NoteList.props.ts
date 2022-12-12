/* props */
import { ButtonProps } from 'shared/components';
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'app/components';
/* types */
import { NoteModel } from 'app/types';

export interface NoteListContextProps {
    /* states */
    noteList: NoteModel[];
    /* functions */
    handleGetNoteList: () => void;
    handleNavigateToEditNote: (noteId: string) => () => void;
    handleNavigateToDetailNote: (noteId: string) => () => void;
    getNoteById: (noteId: string) => NoteModel | undefined;
    /* props */
    createNoteButtonProps: ButtonProps;
    searchInputProps: FieldSetProps;
}

export interface NoteListProviderProps extends ChildrenProps {
    context: NoteListContextProps;
}
