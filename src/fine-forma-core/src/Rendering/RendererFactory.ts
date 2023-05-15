import { IDesignRenderer } from './IDesignRenderer';
import { IDesignContext, IViewportContext, IRenderer, ISelectionContext } from './IRenderer';
import { IRendererFactory } from './IRendererFactory';
import { Renderer } from './Renderer';
import { IUiRenderer } from './UI';

export class RendererFactory implements IRendererFactory {
    
    private readonly _designRenderer: IDesignRenderer;
    private readonly _uiRenderer: IUiRenderer;

    constructor(designRenderer: IDesignRenderer, uiRenderer: IUiRenderer) {
        this._designRenderer = designRenderer;
        this._uiRenderer = uiRenderer;
    }

    create(designContext: IDesignContext, viewportContext: IViewportContext, selectionContext: ISelectionContext): IRenderer {
        return new Renderer(viewportContext, designContext, selectionContext, this._designRenderer, this._uiRenderer);
    }
}