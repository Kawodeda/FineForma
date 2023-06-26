import { IApiClient } from '..';
import { IImagesClient } from './IImagesClient';

export class ImagesClient implements IImagesClient {

    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    uploadImage(image: File): Promise<string> {
        const formData = new FormData();
        formData.append('image', image);

        return this._apiClient.uploadFile<string>('/images/upload', formData);
    }

    downloadImage(storageId: string): Promise<Blob> {
        return this._apiClient.downloadFile(`/images?storageId=${storageId}`);
    }
}