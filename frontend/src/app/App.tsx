/* react */
import { memo } from 'react';
import { BrowserRouter } from 'react-router-dom';
/* routes */
import AppRoutes from './App.routes';
/* styles */
import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};

export default memo(App);
