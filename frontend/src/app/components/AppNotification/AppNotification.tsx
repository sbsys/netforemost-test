/* react */
import { FC, memo } from 'react';
import { createPortal } from 'react-dom';
/* props */
import { NotificationElement, NotificationLayoutProps } from 'shared/components';
/* hooks */
import { useNotification } from 'shared/hooks';
/* utils */
import { classNames } from 'shared/utils';
/* types */
import { Alignment, Direction } from 'shared/types';
import { AppNotifyProps } from 'app/types';
/* styles */
import { ModalLayoutStyles } from 'shared/layouts';
import styles from './AppNotification.module.scss';

const colAlignmentStrategy: Record<Alignment, string> = {
    start: ModalLayoutStyles.ColStart,
    center: ModalLayoutStyles.ColCenter,
    end: ModalLayoutStyles.ColEnd,
};

const rowAlignmentStrategy: Record<Alignment, string> = {
    start: ModalLayoutStyles.RowStart,
    center: ModalLayoutStyles.RowCenter,
    end: ModalLayoutStyles.RowEnd,
};

const ContainerAlignmentStrategy: Record<Direction, string> = {
    'left-right': styles.LeftRight,
    'right-left': styles.RightLeft,
    'top-bottom': styles.TopBottom,
    'bottom-top': styles.BottomTop,
};

const AppNotification: FC<NotificationLayoutProps<NotificationElement<AppNotifyProps>>> = ({
    rowAlignment,
    colAlignment,
    direction,
    children,
}) => {
    const { notifications } = useNotification();

    if (notifications.length === 0) return <></>;

    return createPortal(
        <div
            className={classNames(
                styles.AppNotification,
                ModalLayoutStyles.ModalLayout,
                ModalLayoutStyles.Indentation,
                colAlignment && colAlignmentStrategy[colAlignment],
                rowAlignment && rowAlignmentStrategy[rowAlignment]
            )}>
            <div className={classNames(styles.Container, direction && ContainerAlignmentStrategy[direction])}>
                {notifications.map(
                    (notification, index) => typeof children === 'function' && children({ ...notification, key: index })
                )}
            </div>
        </div>,
        document.getElementById('notification') as HTMLElement
    );
};

export default memo(AppNotification);
