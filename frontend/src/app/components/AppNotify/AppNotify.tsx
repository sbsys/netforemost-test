/* react */
import { FC, memo } from 'react';
/* props */
import { AppNotifyProps, AppNotifyType } from 'app/types';
/* layouts */
import { PanelLayout } from 'shared/layouts';
/* components */
import { Button, Legend, NotificationElement } from 'shared/components';
/* hooks */
import { useAppNotify } from 'app/hooks';
/* utils */
import { format, isDate } from 'date-fns';
import { classNames } from 'shared/utils';
/* assets */
import { MdClose } from 'react-icons/md';
/* styles */
import styles from './AppNotify.module.scss';

const notifyTypeStrategy: Record<AppNotifyType, string> = {
    info: styles.Info,
    success: styles.Success,
    warning: styles.Warning,
    danger: styles.Danger,
};

const AppNotify: FC<NotificationElement<AppNotifyProps>> = ({
    id,
    type,
    data: { title, icon, text, timestamp },
    ...rest
}) => {
    const { unnotify } = useAppNotify();

    return (
        <PanelLayout
            className={classNames(styles.AppNotify, notifyTypeStrategy[type as AppNotifyType])}
            orientation="col"
            {...rest}>
            <PanelLayout className={styles.Title}>
                <Legend hasDots>{title}</Legend>

                <Button type="button" onClick={() => unnotify(id)}>
                    <i>
                        <MdClose />
                    </i>
                </Button>
            </PanelLayout>

            <Legend className={styles.Date} hasDots justify="end">
                {isDate(timestamp) && format(timestamp as Date, 'do MMM yyyy - hh:mm aaa')}
            </Legend>

            <PanelLayout className={styles.Content}>
                <i>{icon}</i>

                <Legend>{text}</Legend>
            </PanelLayout>
        </PanelLayout>
    );
};

export default memo(AppNotify);
