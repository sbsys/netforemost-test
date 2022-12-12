/* react */
import { memo } from 'react';
/* custom hook */
import { useUpdateNote } from './useUpdateNote.hook';
/* context */
import { UpdateNoteProvider } from './UpdateNote.context';
/* components */
import { UpdateNote } from './UpdateNote';

const UpdateNoteView = () => {
    const { context } = useUpdateNote();

    return (
        <UpdateNoteProvider context={context}>
            <UpdateNote />
        </UpdateNoteProvider>
    );
};

export default memo(UpdateNoteView);
