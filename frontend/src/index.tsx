/* react */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
/* apps */
import { App } from 'app';
/* utils */
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
/* styles */
import './index.scss';

createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <App />
    </StrictMode>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
