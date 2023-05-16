import { expect } from 'chai';
import { Canvas, Image } from 'canvas';

import { 
    DesignRenderer, 
    IImageContentStorage, 
    IRendererFactory, 
    ImageContentProvider, 
    ItemRendererFactory, 
    LayerRenderer, 
    Pen, 
    RendererFactory, 
    UiRenderer, 
    Viewer
} from 'fine-forma-core';

import { TEST_RESOURCES_PATH } from './Settings';

export function imageStorageDummy(): IImageContentStorage {
    return {
        getImageContent(storageId: string) {
            throw new Error('Not implemented');
        },
    };
}

export function rendererFactoryWithDummyImageStroage(): IRendererFactory {
    return new RendererFactory(
        new DesignRenderer(
            new LayerRenderer(
                new ItemRendererFactory(
                    new ImageContentProvider(imageStorageDummy())))),
        new UiRenderer({ stroke: Pen.empty }));
}

export function assertViewer(actual: Viewer, expected: Viewer): void {
    expect(actual.design.equals(expected.design)).to.be.true;
    expect(actual.viewport.equals(expected.viewport)).to.be.true;
}

export function delay(milliseconds: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, milliseconds);
    });
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

export function clearCanvas(canvas: Canvas): void {
    const ctx = canvas.getContext('2d');
    ctx.resetTransform();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}