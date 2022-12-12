/* react */
import { FC, memo } from 'react';
import { useOutlet } from 'react-router-dom';
/* props */
import { ManagementLayoutProps } from './Management.props';
/* props */
import { ModalLayout, PanelLayout } from 'shared/layouts';
/* styles */
import styles from './Management.module.scss';

const ManagementLayout: FC<ManagementLayoutProps> = ({ children }) => {
    const outlet = useOutlet();

    return (
        <>
            <PanelLayout orientation="col" className={styles.Management}>
                {typeof children === 'function' ? children() : children}
            </PanelLayout>

            <ModalLayout isVisible={outlet !== null} rowAlignment="center" colAlignment="center" hasIndentation>
                <PanelLayout className={styles.Modal} orientation="col">
                    {outlet}
                </PanelLayout>
            </ModalLayout>
        </>
    );
};

export default memo(ManagementLayout);
