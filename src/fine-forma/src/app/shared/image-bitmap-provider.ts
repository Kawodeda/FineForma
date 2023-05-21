import { Injectable } from '@angular/core';

import { ImageContent, nearlyEquals } from 'fine-forma-core';

import { IImageBitmapProvider } from './i-image-bitmap-provider';

@Injectable({ providedIn: 'root' })
export class ImageBitmapProvider implements IImageBitmapProvider {

    private readonly _images: Map<ImageContent, ImageBitmap>;
    private readonly _requestedImages: Set<ImageContent>;

    constructor() {
        this._images = new Map([]);
        this._requestedImages = new Set([]);
    }

    getImageBitmap(imageContent: ImageContent): ImageBitmap | null {
        const bitmap = this._getSavedImageBitmap(imageContent);
        if (bitmap != null) {
            return bitmap;
        }

        this._requestImageBitmap(imageContent);

        return null;
    }

    private _requestImageBitmap(imageContent: ImageContent): void {
        if (this._isImageBitmapRequested(imageContent)) {
            return;
        }

        this._requestedImages.add(imageContent);
        createImageBitmap(new Blob([imageContent.image]), 0, 0, imageContent.width, imageContent.height)
            .then(imageBitmap => this._images.set(imageContent, imageBitmap))
            .finally(() => this._requestedImages.delete(imageContent));
    }

    private _isImageBitmapRequested(imageContent: ImageContent): boolean {
        for (const requested of this._requestedImages) {
            if (this._compareImageContents(imageContent, requested)) {
                return true;
            }
        }

        return false;
    }

    private _getSavedImageBitmap(imageContent: ImageContent): ImageBitmap | undefined {
        for (const image of this._images.keys()) {
            if (this._compareImageContents(image, imageContent)) {
                return this._images.get(image);
            }
        }

        return undefined;
    }

    private _compareImageContents(image1: ImageContent, image2: ImageContent): boolean {
        if (image1 === image2) {
            return true;
        }

        if (!nearlyEquals(image1.width, image2.width) 
        || !nearlyEquals(image1.height, image2.height)
        || image1.image.length !== image2.image.length) {
            return false;
        }

        for (let i = 0; i < image1.image.length; i++) {
            if (image1.image[i] !== image2.image[i]) {
                return false;
            }
        }

        return true;
    }
}