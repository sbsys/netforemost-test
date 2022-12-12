/* react */
import { memo } from 'react';
/* layouts */
import { PanelLayout } from 'shared/layouts';
import { ManagementLayout } from 'app/layouts';
/* components */
import { TaskListHeader } from '../TaskListHeader';
/* styles */
import styles from './TaskList.module.scss';

const TaskList = () => {
    return (
        <ManagementLayout>
            <PanelLayout orientation="col" className={styles.TaskList}>
                <TaskListHeader />
            </PanelLayout>
        </ManagementLayout>
    );
};

export default memo(TaskList);
