/* react */
import { memo } from 'react';
/* custom hook */
import { useCreateNote } from './useCreateNote.hook';
/* context */
import { CreateNoteProvider } from './CreateNote.context';
/* components */
import { CreateNote } from './CreateNote';

const CreateNoteView = () => {
    const { context } = useCreateNote();

    return (
        <CreateNoteProvider context={context}>
            <CreateNote />
        </CreateNoteProvider>
    );
};

export default memo(CreateNoteView);
