import { IDesignContext, IRenderer, IViewportContext } from './IRenderer';

export interface IRendererFactory {

    create(designContext: IDesignContext, viewportContext: IViewportContext): IRenderer;
}