/* serializers */
import { apiErrorSerializer, apiSerializer } from 'app/serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* constants */
import { AppApiService } from 'app/constants';
/* types */
import { ApiResponse, TaskModel } from '../types';

interface GetTaskListProps {}

export const getTaskListService = async (props?: GetTaskListProps): Promise<ApiResponse<TaskModel[]>> => {
    return await apiRequestHandler({
        instance: AppApiService,
        endpoint: '/tasks',
        body: props,
        responseSerializer: async data => apiSerializer(data),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
