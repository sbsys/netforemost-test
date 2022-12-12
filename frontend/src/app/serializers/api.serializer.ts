import { AxiosError } from 'axios';
import { ApiResponse } from '../types';

export const apiSerializer = <T = unknown>(data: any, serializer?: (data: any) => T): ApiResponse<T> => ({
    message: data.message,
    status: data.status,
    data: typeof serializer === 'function' ? serializer(data.data) : (data.data as T),
});

export const apiErrorSerializer = <T = unknown>(error: AxiosError, serializer?: (data: any) => T): ApiResponse<T> => {
    if (error.response?.data) return apiSerializer({ ...(error.response?.data as Object) }, serializer);
    else if (error.request?.data)
        return {
            message: error.request.data,
            status: false,
            data: {} as T,
        };
    else
        return {
            message: error.message,
            status: false,
            data: {} as T,
        };
};
