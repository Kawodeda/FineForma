import { IApiClient } from './IApiClient';
import * as Dto from './Dto';

export class DesignManager {

    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    async listDesigns(): Promise<Dto.DesignInfo[]> {
        return this._apiClient.get<Dto.DesignInfo[]>('/designs/list');
    }

    async loadDesigns(name: string): Promise<unknown> {
        const result = await this._apiClient.get<Dto.DesignInfo[]>(`/designs?name=${name}`);

        return result;
    }
}