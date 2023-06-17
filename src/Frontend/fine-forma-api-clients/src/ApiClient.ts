import axios, { AxiosInstance, GenericAbortSignal, InternalAxiosRequestConfig } from 'axios';

import { HttpError, Unauthorized, NotFound, BadRequest } from './Errors';
import { IApiClient } from './IApiClient';

export class ApiClient implements IApiClient {

    private readonly _baseUrl: string;

    constructor(baseUrl: string) {
        this._baseUrl = baseUrl;
    }

    async get<T = unknown>(endpoint: string, params?: unknown, signal?: AbortSignal): Promise<T> {
        try {
            const client = this._createClient(params);
            const response = await client.get<T>(endpoint, { signal: signal as GenericAbortSignal });

            return response.data;
        }
        catch (error) {
            this._handleError(error);
        }
    }

    async post<T = unknown>(endpont: string, data?: unknown, params?: unknown, signal?: AbortSignal): Promise<T> {
        try {
            const client = this._createClient(params);
            const response = await client.post<T>(endpont, data, { signal: signal as GenericAbortSignal });

            return response.data;
        }
        catch (error) {
            this._handleError(error);
        }
    }

    async delete<T = unknown>(endpont: string, data?: unknown, params?: unknown, signal?: AbortSignal): Promise<T> {
        try {
            const client = this._createClient(params);
            const response = await client.delete<T>(endpont, { signal: signal as GenericAbortSignal });

            return response.data;
        }
        catch (error) {
            this._handleError(error);
        }
    }

    async uploadFile<T = unknown>(endpont: string, formData: FormData): Promise<T> {
        try {
            const client = this._createClient();
            const response = await client.post<T>(endpont, formData, {
                headers: {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        }
        catch (error) {
            this._handleError(error);
        }
    }

    private _createClient(params?: unknown): AxiosInstance {
        const config = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            baseURL: this._baseUrl,
            params: params
        };
        const client = axios.create(config);
        client.interceptors.request.use(request => this._requestInterceptor(request));

        return client;
    }

    private _requestInterceptor(request: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
        request.withCredentials = true;

        return request;
    }

    private _handleError(error: unknown): never {
        if (!HAS_RESPONSE(error) && HAS_MESSAGE(error)) {
            throw new HttpError(error.message);
        }
        if (HAS_RESPONSE(error)) {
            switch (error.response.status) {
                case 400:
                    throw new BadRequest(error.response.data);
                case 401:
                    throw new Unauthorized(error.response.data);
                case 404:
                    throw new NotFound(error.response.data);
            }
        }
        
        throw error;
    }
}

interface IErrorWithResponse {
    get response(): {
        get status(): number;
        get data(): string;
    };
}

interface IErrorWithMessage {
    get message(): string;
}

const HAS_RESPONSE = (error: unknown): error is IErrorWithResponse => 
    typeof error === 'object'
    && error != null
    && 'response' in error
    && typeof error.response === 'object'
    && error.response != null
    && 'status' in error.response
    && typeof error.response.status === 'number'
    && 'data' in error.response
    && typeof error.response.data === 'string';

const HAS_MESSAGE = (error: unknown): error is IErrorWithMessage =>
    typeof error === 'object'
    && error != null
    && 'message' in error
    && typeof error.message === 'string';