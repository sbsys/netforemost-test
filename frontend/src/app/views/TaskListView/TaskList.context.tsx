/* react */
import { createContext, FC, useContext } from 'react';
/* props */
import { TaskListContextProps, TaskListProviderProps } from './TaskList.props';

const Context = createContext<TaskListContextProps>({
    /* states */
    taskList: [],
    handleGetTaskList: () => {},
});

export const TaskListProvider: FC<TaskListProviderProps> = ({ context, children }) => {
    return (
        <Context.Provider value={context}>{typeof children === 'function' ? children() : children}</Context.Provider>
    );
};

export const useTaskListContext = () => useContext(Context);
