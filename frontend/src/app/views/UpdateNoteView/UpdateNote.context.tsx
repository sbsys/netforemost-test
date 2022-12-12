/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { UpdateNoteContextProps, UpdateNoteProviderProps } from './UpdateNote.props';

const Context = createContext<UpdateNoteContextProps>({
    /* functions */
    handleCancelUpdateNote: () => {},
    handleUpdateNote: () => {},
    /* props */
    updateNoteInputListProps: [],
});

export const UpdateNoteProvider: FC<UpdateNoteProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useUpdateNoteContext = () => useContext(Context);
