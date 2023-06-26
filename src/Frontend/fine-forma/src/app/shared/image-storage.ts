import { IImagesClient } from 'fine-forma-api-clients';
import { IImageContentStorage, ImageContent } from 'fine-forma-core';

export class ImageStorage implements IImageContentStorage {
    
    private readonly _imagesClient: IImagesClient;

    constructor(imagesClient: IImagesClient) {
        this._imagesClient = imagesClient;
    }

    getImageContent(storageId: string): Promise<ImageContent> {
        return this._imagesClient.downloadImage(storageId).then(blob => new Promise<ImageContent>((resolve) => {
            const image = new Image();
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d')?.drawImage(image, 0, 0);
                canvas.toBlob(b => {
                    if (b == null) {
                        throw new Error();
                    }

                    b.arrayBuffer()
                        .then(arrayBuffer => resolve(
                            new ImageContent(
                                new Uint8ClampedArray(arrayBuffer), image.naturalWidth, image.naturalHeight)))
                        .catch(reason => console.error(reason));
                });
            };
            const url = URL.createObjectURL(blob);
            image.src = url;
        }));
    }
}