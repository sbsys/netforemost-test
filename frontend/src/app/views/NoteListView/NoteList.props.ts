/* props */
import { ButtonProps } from 'shared/components';
import { ChildrenProps } from 'shared/props';
import { FieldSetProps } from 'app/components';
/* types */
import { NoteModel, SortNoteModel } from 'app/types';

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
    sortNotesButtonListProps: ButtonProps[];
}

export interface NoteListProviderProps extends ChildrenProps {
    context: NoteListContextProps;
}

export type SortFlow = 'descending' | 'ascending';

export interface SortNoteProps {
    prop: keyof SortNoteModel;
    flow: SortFlow;
}

export const sortEvaluationStrategy: Record<SortFlow, (value: boolean) => 1 | -1> = {
    descending: function (value: boolean): 1 | -1 {
        return value ? -1 : 1;
    },
    ascending: function (value: boolean): 1 | -1 {
        return value ? 1 : -1;
    },
};
