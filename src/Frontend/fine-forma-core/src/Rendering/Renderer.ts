import { IDesignContext } from '../Design';
import { IDesignRenderer } from './IDesignRenderer';
import { IRenderer, IViewportContext } from './IRenderer';
import { IRenderingContext } from './IRenderingContext';

export class Renderer implements IRenderer {
    
    private readonly _viewportContext: IViewportContext;
    private readonly _designContext: IDesignContext;
    private readonly _designRenderer: IDesignRenderer;
    private readonly _uiRenderer: IRenderer;

    constructor(
        viewportContext: IViewportContext, 
        designContext: IDesignContext,
        designRenderer: IDesignRenderer,
        uiRenderer: IRenderer
    ) {
        this._viewportContext = viewportContext;
        this._designContext = designContext;
        this._designRenderer = designRenderer;
        this._uiRenderer = uiRenderer;
    }

    render(context: IRenderingContext): void {
        context.setTransform(this._viewportContext.viewport.transform);
        this._designRenderer.render(context, this._designContext.design);
        this._uiRenderer.render(context);
    }
}