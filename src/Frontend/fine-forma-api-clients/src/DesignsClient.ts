import { IApiClient } from './IApiClient';
import * as Dto from './Dto';

export class DesignsClient {

    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    listDesigns(): Promise<Dto.DesignInfo[]> {
        return this._apiClient.get<Dto.DesignInfo[]>('/designs/list');
    }

    loadDesign(name: string): Promise<Dto.Design> {
        return this._apiClient.get<Dto.Design>(`/designs?name=${name}`);
    }

    saveDesign(design: Dto.Design, name: string): Promise<void> {
        return this._apiClient.post(`/designs/save?name=${name}`, design);
    }

    deleteDesign(name: string): Promise<void> {
        return this._apiClient.delete(`/designs/delete?name=${name}`);
    }
}