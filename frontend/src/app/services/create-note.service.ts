/* serializers */
import { apiErrorSerializer, apiSerializer } from 'app/serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* constants */
import { AppApiService } from 'app/constants';
/* types */
import { ApiResponse, CreateNoteDTO } from '../types';

interface CreateNoteProps extends CreateNoteDTO {}

export const createNoteService = async (props: CreateNoteProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler({
        instance: AppApiService,
        endpoint: '/notes',
        method: 'POST',
        body: props,
        responseSerializer: async data => apiSerializer(data),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
