import { 
    DesignRenderer, 
    IImageContentStorage, 
    IRendererFactory, 
    ISelectionStyle, 
    ImageContentProvider, 
    ItemRendererFactory, 
    LayerRenderer, 
    Pen, 
    RendererFactory 
} from 'fine-forma-core';
import { uiRendererFactory } from '../Utils';

export function rendererFactory(
    imageStorage: IImageContentStorage, 
    selectionStyle: ISelectionStyle = { stroke: Pen.empty }): IRendererFactory {
    return new RendererFactory(
        new DesignRenderer(
            new LayerRenderer(
                new ItemRendererFactory(
                    new ImageContentProvider(imageStorage)))),
        uiRendererFactory(selectionStyle)
    );
}