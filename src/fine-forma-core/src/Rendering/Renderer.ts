import { IDesignRenderer } from './IDesignRenderer';
import { IDesignContext, IRenderer, ISelectionContext, IViewportContext } from './IRenderer';
import { IRenderingContext } from './IRenderingContext';
import { IUiRenderer } from './UI';

export class Renderer implements IRenderer {
    
    private readonly _viewportContext: IViewportContext;
    private readonly _designContext: IDesignContext;
    private readonly _selectionContext: ISelectionContext;
    private readonly _designRenderer: IDesignRenderer;
    private readonly _uiRenderer: IUiRenderer;

    constructor(
        viewportContext: IViewportContext, 
        designContext: IDesignContext, 
        selectionContext: ISelectionContext, 
        designRenderer: IDesignRenderer,
        uiRenderer: IUiRenderer) {
        this._viewportContext = viewportContext;
        this._designContext = designContext;
        this._selectionContext = selectionContext;
        this._designRenderer = designRenderer;
        this._uiRenderer = uiRenderer;
    }

    render(context: IRenderingContext): void {
        context.setTransform(this._viewportContext.viewport.transform);
        this._designRenderer.render(context, this._designContext.design);
        this._uiRenderer.render(context, this._selectionContext.selection);
    }
}