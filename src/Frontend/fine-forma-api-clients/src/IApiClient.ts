export interface IApiClient {

    get<T = unknown>(endpoint: string, params?: unknown, signal?: AbortSignal): Promise<T>;

    post<T = unknown>(endpont: string, data?: unknown, params?: unknown, signal?: AbortSignal): Promise<T>;

    delete<T = unknown>(endpont: string, data?: unknown, params?: unknown, signal?: AbortSignal): Promise<T>;

    uploadFile<T = unknown>(endpont: string, formData: FormData): Promise<T>;

    downloadFile(endpoint: string): Promise<Blob>;
}