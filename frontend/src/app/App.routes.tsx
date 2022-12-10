/* react */
import { FC, memo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const AppRoutes: FC = () => {
    return (
        <Routes>
            <Route index element={<Navigate to="tasks" replace />} />

            <Route path="*" element={<span>404</span>} />
        </Routes>
    );
};

export default memo(AppRoutes);
