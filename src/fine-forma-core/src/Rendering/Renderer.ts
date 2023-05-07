import { Design } from '../Design';
import { Viewport } from '../Viewport/Viewport';
import { IDesignRenderer } from './IDesignRenderer';
import { IRenderer } from './IRenderer';
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

export interface IViewportContext {

    get viewport(): Viewport;
}

export interface IDesignContext {

    get design(): Design;
}