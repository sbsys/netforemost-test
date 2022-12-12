/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { TaskListView } from './views';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="tasks" replace />} />

            <Route path="tasks" element={<TaskListView />}>
                <Route path="create" element={<>Create</>} />

                <Route path=":taskId/detail" element={<>Detail</>} />

                <Route path=":taskId/edit" element={<>Edit</>} />
            </Route>

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
