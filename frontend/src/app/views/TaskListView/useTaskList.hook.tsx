/* react */
import { useCallback, useEffect, useMemo, useState } from 'react';
/* props */
import { TaskListContextProps } from './TaskList.props';
/* hooks */
import { useLoader } from 'shared/hooks';
import { useAppNotify } from 'app/hooks';
/* services */
import { getTaskListService } from 'app/services';
/* assets */
import { MdDangerous } from 'react-icons/md';
/* types */
import { TaskModel } from 'app/types';

export const useTaskList = () => {
    /* states */
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    const taskList = useMemo(() => tasks, [tasks]);

    const { showLoader, hideLoader } = useLoader();

    const { notify } = useAppNotify();

    /* functions */
    const handleGetTaskList = useCallback(async () => {
        showLoader();

        const service = await getTaskListService();

        hideLoader();

        if (!service.status)
            return notify('danger', {
                title: 'Error',
                icon: <MdDangerous />,
                text: service.message,
                timestamp: new Date(),
            });

        setTasks(service.data);
    }, [hideLoader, notify, showLoader]);

    /* reactivity */
    useEffect(() => {
        handleGetTaskList();
    }, [handleGetTaskList]);

    /* context */
    const context: TaskListContextProps = {
        /* states */
        taskList,
        /* functions */
        handleGetTaskList,
    };

    return { context };
};
