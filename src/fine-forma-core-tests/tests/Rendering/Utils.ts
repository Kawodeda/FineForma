import { Image } from 'canvas';

import { ColorComponent, IColorPreview, IImageContentProvider, IImageContentStorage, ImageContentProvider } from 'fine-forma-core';

import { TEST_RESOURCES_PATH } from '../Settings';

export function colorPreviewToHtml(preview: IColorPreview): string {
    if(preview.alpha.value === ColorComponent.maxValue) {
        return `rgb(${preview.r.value},${preview.g.value},${preview.b.value})`;
    }
    else {
        return `rgba(${preview.r.value},${preview.g.value},${preview.b.value},${preview.alpha.value / ColorComponent.maxValue})`;
    }
}

export function loadImage(name: string): Promise<Image> {
    return new Promise<Image>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve(image);
        };
        image.onerror = () => reject();
        image.src = `${TEST_RESOURCES_PATH}\\${name}`;
    });
}

export function setupImageContentProvider(imageStorage: IImageContentStorage, images: Map<string, string>): Promise<IImageContentProvider> {
    return new Promise<IImageContentProvider>(resolve => {
        const imageContentProvider = new ImageContentProvider(imageStorage);
        for(const storageId of images.keys()) {
            imageContentProvider.getContent(storageId)
        }

        setTimeout(() => {
            resolve(imageContentProvider);
        }, 10);
    });
}