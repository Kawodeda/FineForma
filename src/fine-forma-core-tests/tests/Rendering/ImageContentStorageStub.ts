import { readFile } from 'node:fs/promises';

import { IImageContentStorage, ImageContent } from 'fine-forma-core';

export class ImageContentStorageStub implements IImageContentStorage {

    private readonly _images: ReadonlyMap<string, ImageContent>;

    constructor(images: ReadonlyMap<string, ImageContent>) {
        this._images = images;
    }

    static async setup(imagePaths: Map<string, string>): Promise<ImageContentStorageStub> {
        const images = new Map<string, ImageContent>();
        for(const image of imagePaths.entries()) {
            const data = await readFile(image[1]);
            images.set(image[0], new ImageContent(new Uint8ClampedArray(data), 0, 0));
        }

        return new ImageContentStorageStub(images);
    }

    async getImageContent(storageId: string): Promise<ImageContent> {
        const imageContent = this._images.get(storageId);
        if (imageContent != null) {
            return imageContent;
        }

        throw new Error('Image with specified id does not exist');
    }
}