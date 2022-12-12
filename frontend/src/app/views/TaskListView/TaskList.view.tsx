/* react */
import { memo } from 'react';
/* custom hook */
import { useTaskList } from './useTaskList.hook';
/* context */
import { TaskListProvider } from './TaskList.context';
/* components */
import { TaskList } from './TaskList';

const TaskListView = () => {
    const { context } = useTaskList();

    return (
        <TaskListProvider context={context}>
            <TaskList />
        </TaskListProvider>
    );
};

export default memo(TaskListView);
