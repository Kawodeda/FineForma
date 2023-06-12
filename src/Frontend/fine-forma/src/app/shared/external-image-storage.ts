import { IImageContentStorage, ImageContent } from 'fine-forma-core';

export class ExternalImageStorage implements IImageContentStorage {

    private readonly _images: Map<string, string>;

    constructor(images: [string, string][] = []) {
        this._images = new Map(images);
    }

    getImageContent(storageId: string): Promise<ImageContent> {
        const url = this._images.get(storageId);
        if (url == null) {
            throw new Error('Image with specified id is missing in storage');
        }

        return new Promise<ImageContent>((resolve) => {
            const image = new Image();
            image.crossOrigin = 'anonymous';
            image.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = image.naturalWidth;
                canvas.height = image.naturalHeight;
                canvas.getContext('2d')?.drawImage(image, 0, 0);
                canvas.toBlob(blob => {
                    if (blob == null) {
                        throw new Error();
                    }

                    blob.arrayBuffer()
                        .then(arrayBuffer => resolve(
                            new ImageContent(
                                new Uint8ClampedArray(arrayBuffer), image.naturalWidth, image.naturalHeight)))
                        .catch(reason => console.error(reason));
                });
            };
            image.src = url;
        });
    }

    addImageUrl(storageId: string, imageUrl: string): void {
        this._images.set(storageId, imageUrl);
    }
}