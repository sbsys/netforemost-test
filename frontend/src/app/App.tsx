/* react */
import { memo, Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
/* components */
import { Loader, Notification, NotificationElement } from 'shared/components';
import { AppLoader, AppNotification, AppNotify } from './components';
/* routes */
import AppRoutes from './App.routes';
/* types */
import { AppNotifyProps } from './types';
/* styles */
import './App.scss';

const App = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<span>Loading...</span>}>
                <Notification
                    duration={5000}
                    element={
                        <AppNotification rowAlignment="start" colAlignment="end" direction="bottom-top">
                            {props => <AppNotify {...(props as NotificationElement<AppNotifyProps>)} />}
                        </AppNotification>
                    }>
                    <Loader element={<AppLoader />}>
                        <AppRoutes />
                    </Loader>
                </Notification>
            </Suspense>
        </BrowserRouter>
    );
};

export default memo(App);
