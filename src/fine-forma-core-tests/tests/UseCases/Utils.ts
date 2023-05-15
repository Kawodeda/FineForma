import { DesignRenderer, IImageContentStorage, IRendererFactory, ImageContentProvider, ItemRendererFactory, LayerRenderer, RendererFactory } from 'fine-forma-core';

export function rendererFactory(imageStorage: IImageContentStorage): IRendererFactory {
    return new RendererFactory(
        new DesignRenderer(
            new LayerRenderer(
                new ItemRendererFactory(
                    new ImageContentProvider(imageStorage)))));
}