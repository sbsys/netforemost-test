/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* views */
import { CreateNoteView, NoteDetailView, NoteListView } from './views';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="notes" replace />} />

            <Route path="notes" element={<NoteListView />}>
                <Route path="create" element={<CreateNoteView />} />

                <Route path=":noteId/detail" element={<NoteDetailView />} />

                <Route path=":noteId/edit" element={<>Edit</>} />
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
