/* react */
import { memo } from 'react';
/* custom hook */
import { useNoteList } from './useNoteList.hook';
/* context */
import { NoteListProvider } from './NoteList.context';
/* components */
import { NoteList } from './NoteList';

const NoteListView = () => {
    const { context } = useNoteList();

    return (
        <NoteListProvider context={context}>
            <NoteList />
        </NoteListProvider>
    );
};

export default memo(NoteListView);
