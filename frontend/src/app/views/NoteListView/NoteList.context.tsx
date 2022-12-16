/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { NoteListContextProps, NoteListProviderProps } from './NoteList.props';

const Context = createContext<NoteListContextProps>({
    /* states */
    noteList: [],
    /* functions */
    handleGetNoteList: () => {},
    handleNavigateToEditNote: () => () => {},
    handleNavigateToDetailNote: () => () => {},
    getNoteById: () => undefined,
    /* props */
    createNoteButtonProps: {},
    searchInputProps: { field: {} },
    sortNotesButtonListProps: [],
});

export const NoteListProvider: FC<NoteListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useNoteListContext = () => useContext(Context);
