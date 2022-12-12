import { ReactNode } from 'react';

export interface AppNotifyProps {
    title?: string;
    icon?: ReactNode;
    text: string;
    timestamp?: Date;
}

export type AppNotifyType = 'info' | 'success' | 'warning' | 'danger';
