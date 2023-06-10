import { IDesignContext } from '../Design';
import { ISelectionContext } from '../ISelectionContext';
import { IRenderer, IViewportContext } from './IRenderer';

export interface IRendererFactory {

    create(designContext: IDesignContext, viewportContext: IViewportContext, selectionContext: ISelectionContext): IRenderer;
}