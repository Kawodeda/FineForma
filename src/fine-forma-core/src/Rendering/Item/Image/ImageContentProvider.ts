import { Maybe } from 'tsmonad';

import { IImageContentProvider } from './IImageContentProvider';
import { ImageContent } from './ImageContent';
import { IImageContentStorage } from '../../../Storage/IImageContentStorage';

export class ImageContentProvider implements IImageContentProvider {

    private readonly _imageContentStorage: IImageContentStorage;
    private readonly _loadedImages: Map<string, ImageContent>;
    private readonly _requestedImages: Set<string>;

    constructor(imageContentStorage: IImageContentStorage) {
        this._imageContentStorage = imageContentStorage;
        this._loadedImages = new Map<string, ImageContent>();
        this._requestedImages = new Set<string>();
    }

    getContent(storageId: string): Maybe<ImageContent> {
        const imageContent = this._loadedImages.get(storageId);
        if (imageContent != null) {
            return Maybe.just(imageContent);
        }

        this._requestImageContent(storageId);

        return Maybe.nothing();
    }

    private _requestImageContent(storageId: string): void {
        if (this._requestedImages.has(storageId)) {
            return;
        }

        this._requestedImages.add(storageId);
        this._imageContentStorage.getImageContent(storageId)
            .then(imageContent => {
                this._loadedImages.set(storageId, imageContent)
            })
            .finally(() => {
                this._requestedImages.delete(storageId);
            });
    }
}