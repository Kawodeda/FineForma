import { ColorComponent, IColorPreview, IImageContentProvider, IImageContentStorage, ImageContentProvider } from 'fine-forma-core';

export function colorPreviewToHtml(preview: IColorPreview): string {
    if(preview.alpha.value === ColorComponent.maxValue) {
        return `rgb(${preview.r.value},${preview.g.value},${preview.b.value})`;
    }
    else {
        return `rgba(${preview.r.value},${preview.g.value},${preview.b.value},${preview.alpha.value / ColorComponent.maxValue})`;
    }
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