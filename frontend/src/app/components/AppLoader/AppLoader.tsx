/* react */
import { memo } from 'react';
/* layouts */
import { ModalLayout } from 'shared/layouts';
/* components */
import { ThreeCircles } from 'react-loader-spinner';
/* hooks */
import { useLoader } from 'shared/hooks';
/* styles */
import styles from './AppLoader.module.scss';

const AppLoader = () => {
    const { isLoading } = useLoader();

    return (
        <ModalLayout isVisible={isLoading} hasIndentation rowAlignment="center" colAlignment="center" nodeId="loader">
            <ThreeCircles color="currentColor" wrapperClass={styles.AppLoader} visible={true} />
        </ModalLayout>
    );
};

export default memo(AppLoader);
