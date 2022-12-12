/* props */
import { ChildrenProps } from 'shared/props';
/* types */
import { TaskModel } from 'app/types';

export interface TaskListContextProps {
    /* states */
    taskList: TaskModel[];
    /* functions */
    handleGetTaskList: () => void;
}

export interface TaskListProviderProps extends ChildrenProps {
    context: TaskListContextProps;
}
