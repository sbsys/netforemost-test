/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { CreateNoteContextProps, CreateNoteProviderProps } from './CreateNote.props';

const Context = createContext<CreateNoteContextProps>({
    /* functions */
    handleCancelCreateNote: () => {},
    handleCreateNote: () => {},
    /* props */
    createNoteInputListProps: [],
});

export const CreateNoteProvider: FC<CreateNoteProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useCreateNoteContext = () => useContext(Context);
