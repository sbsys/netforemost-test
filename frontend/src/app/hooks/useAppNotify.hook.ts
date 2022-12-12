/* hooks */
import { useCallback } from 'react';
import { useNotification } from 'shared/hooks';
/* types */
import { AppNotifyProps, AppNotifyType } from '../types';

export const useAppNotify = () => {
    const { addNotification, removeNotification } = useNotification();

    const notify = useCallback(
        (type: AppNotifyType, data: AppNotifyProps) => addNotification(type, data),
        [addNotification]
    );

    return {
        notify,
        unnotify: removeNotification,
    };
};
