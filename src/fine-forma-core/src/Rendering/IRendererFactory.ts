import { IDesignContext, IRenderer, ISelectionContext, IViewportContext } from './IRenderer';

export interface IRendererFactory {

    create(designContext: IDesignContext, viewportContext: IViewportContext, selectionContext: ISelectionContext): IRenderer;
}