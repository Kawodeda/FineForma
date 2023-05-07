import { IDesignRenderer } from './IDesignRenderer';
import { IDesignContext, IRenderer, IViewportContext } from './IRenderer';
import { IRenderingContext } from './IRenderingContext';

export class Renderer implements IRenderer {
    
    private readonly _viewportContext: IViewportContext;
    private readonly _designContext: IDesignContext;
    private readonly _designRenderer: IDesignRenderer;

    constructor(viewportContext: IViewportContext, designContext: IDesignContext, designRenderer: IDesignRenderer) {
        this._viewportContext = viewportContext;
        this._designContext = designContext;
        this._designRenderer = designRenderer;
    }

    render(context: IRenderingContext): void {
        context.setTransform(this._viewportContext.viewport.transform);
        this._designRenderer.render(context, this._designContext.design);
    }
}