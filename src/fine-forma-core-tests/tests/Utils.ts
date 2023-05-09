import { DesignRenderer, IImageContentStorage, IRendererFactory, ImageContentProvider, ItemRendererFactory, LayerRenderer, RendererFactory, Viewer } from 'fine-forma-core';
import { expect } from 'chai';

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
                    new ImageContentProvider(imageStorageDummy())))));
}

export function assertViewer(actual: Viewer, expected: Viewer): void {
    expect(actual.design.equals(expected.design)).to.be.true;
    expect(actual.viewport.equals(expected.viewport)).to.be.true;
}