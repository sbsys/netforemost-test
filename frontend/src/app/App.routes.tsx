/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
/* views */
import { CreateNoteView, NoteListView } from './views';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="notes" replace />} />

            <Route path="notes" element={<NoteListView />}>
                <Route path="create" element={<CreateNoteView />} />

                <Route path=":taskId/detail" element={<>Detail</>} />

                <Route path=":taskId/edit" element={<>Edit</>} />
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
