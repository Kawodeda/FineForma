import { DesignRenderer, IImageContentStorage, IRendererFactory, ISelectionStyle, ImageContentProvider, ItemRendererFactory, LayerRenderer, Pen, RendererFactory, UiRenderer } from 'fine-forma-core';

export function rendererFactory(
    imageStorage: IImageContentStorage, 
    selectionStyle: ISelectionStyle = { stroke: Pen.empty }): IRendererFactory {
    return new RendererFactory(
        new DesignRenderer(
            new LayerRenderer(
                new ItemRendererFactory(
                    new ImageContentProvider(imageStorage)))),
        new UiRenderer(selectionStyle));
}