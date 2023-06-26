import { Inject, Injectable } from '@angular/core';

import { AddItemCommand, Command, IImageContentStorage, Vector2, createImage } from 'fine-forma-core';
import { IImagesClient } from 'fine-forma-api-clients';

import { IMAGES_CLIENT } from '../../shared/images-client-token';
import { IMAGE_CONTENT_STORAGE } from '../../shared/image-content-storage-token';
import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { canvasToDesignPoint } from '../shared/reference-frame-converter';
import { IImageInsertService } from './i-image-insert-service';

@Injectable()
export class ImageInsertService implements IImageInsertService {
    
    private readonly _imagesClient: IImagesClient;
    private readonly _imageContentStorage: IImageContentStorage;
    private readonly _viewerProvider: IViewerProvider;

    constructor(
        @Inject(IMAGES_CLIENT) imagesClient: IImagesClient,
        @Inject(IMAGE_CONTENT_STORAGE) imageContentStorage: IImageContentStorage,
        @Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider
    ) {
        this._imagesClient = imagesClient;
        this._imageContentStorage = imageContentStorage;
        this._viewerProvider = viewerProvider;
    }

    async insertImage(image: File, x: number, y: number): Promise<void> {
        const storageId = await this._imagesClient.uploadImage(image);
        const content = await this._imageContentStorage.getImageContent(storageId);
        const position = canvasToDesignPoint(new Vector2(x, y), this._viewerProvider.viewer.viewport);
        const item = createImage(position.x, position.y, content.width, content.height, storageId).build();

        await this._viewerProvider.viewer.execute(new Command([
            new AddItemCommand(item)
        ]));
    }
}