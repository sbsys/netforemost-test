/* serializers */
import { apiErrorSerializer, apiSerializer } from 'app/serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* constants */
import { AppApiService } from 'app/constants';
/* types */
import { ApiResponse, UpdateNoteDTO } from '../types';

interface UpdateNoteProps extends UpdateNoteDTO {}

export const updateNoteService = async (noteId: string, props: UpdateNoteProps): Promise<ApiResponse<{}>> => {
    return await apiRequestHandler({
        instance: AppApiService,
        endpoint: `/notes/${noteId}`,
        method: 'PATCH',
        body: props,
        responseSerializer: async data => apiSerializer(data),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
