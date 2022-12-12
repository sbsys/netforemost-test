/* serializers */
import { apiErrorSerializer, apiSerializer } from 'app/serializers';
/* handlers */
import { apiRequestHandler } from 'shared/handlers';
/* constants */
import { AppApiService } from 'app/constants';
/* types */
import { ApiResponse, NoteModel } from '../types';

interface GetNoteListProps {}

export const getNoteListService = async (props?: GetNoteListProps): Promise<ApiResponse<NoteModel[]>> => {
    return await apiRequestHandler({
        instance: AppApiService,
        endpoint: '/notes',
        body: props,
        responseSerializer: async data => apiSerializer(data),
        errorSerializer: async error => apiErrorSerializer(error),
    });
};
