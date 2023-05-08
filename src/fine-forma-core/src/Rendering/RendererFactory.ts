import { IDesignRenderer } from './IDesignRenderer';
import { IDesignContext, IViewportContext, IRenderer } from './IRenderer';
import { IRendererFactory } from './IRendererFactory';
import { Renderer } from './Renderer';

export class RendererFactory implements IRendererFactory {
    
    private readonly _designRenderer: IDesignRenderer;

    constructor(designRenderer: IDesignRenderer) {
        this._designRenderer = designRenderer;
    }

    create(designContext: IDesignContext, viewportContext: IViewportContext): IRenderer {
        return new Renderer(viewportContext, designContext, this._designRenderer);
    }
}