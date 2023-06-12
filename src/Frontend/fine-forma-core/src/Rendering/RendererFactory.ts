import { IDesignContext } from '../Design';
import { ISelectionContext } from '../ISelectionContext';
import { IDesignRenderer } from './IDesignRenderer';
import { IViewportContext, IRenderer } from './IRenderer';
import { IRendererFactory } from './IRendererFactory';
import { Renderer } from './Renderer';

export class RendererFactory implements IRendererFactory {
    
    private readonly _designRenderer: IDesignRenderer;
    private readonly _uiRendererFactory: IRendererFactory;

    constructor(designRenderer: IDesignRenderer, uiRendererFactory: IRendererFactory) {
        this._designRenderer = designRenderer;
        this._uiRendererFactory = uiRendererFactory;
    }

    create(designContext: IDesignContext, viewportContext: IViewportContext, selectionContext: ISelectionContext): IRenderer {
        return new Renderer(
            viewportContext, 
            designContext,
            this._designRenderer, 
            this._uiRendererFactory.create(designContext, viewportContext, selectionContext)
        );
    }
}