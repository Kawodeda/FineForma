import { ICommand, IExecutionContext } from './Commands/Interfaces';
import { Design } from './Design';
import { IRenderer, IDesignContext, IViewportContext, IRendererFactory } from './Rendering';
import { Viewport } from './Viewport';

export class Viewer implements IDesignContext, IViewportContext, IExecutionContext {
    
    private readonly _renderer: IRenderer;

    private _design: Design;
    private _viewport: Viewport;

    constructor(design: Design, viewport: Viewport, rendererFactory: IRendererFactory) {
        this._design = design;
        this._viewport = viewport;
        this._renderer = rendererFactory.create(this, this);
    }

    get renderer(): IRenderer {
        return this._renderer;
    }

    get design(): Design {
        return this._design;
    }

    get viewport(): Viewport {
        return this._viewport;
    }

    set design(design: Design) {
        this._design = design;
    }

    set viewport(viewport: Viewport) {
        this._viewport = viewport;
    }

    async execute(command: ICommand): Promise<void> {
        await command.execute(this);
    }
}