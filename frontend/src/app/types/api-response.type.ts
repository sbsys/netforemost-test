export interface ApiResponse<T = any> {
    message: string;
    status: boolean;
    data: T;
}
