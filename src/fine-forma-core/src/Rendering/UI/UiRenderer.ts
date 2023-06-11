import { IRenderer } from '..';
import { IRenderingContext } from '../IRenderingContext';

export class UiRenderer implements IRenderer {
    
    private readonly _renderers: readonly IRenderer[];

    constructor(renderers: readonly IRenderer[]) {
        this._renderers = renderers;
    }

    render(context: IRenderingContext): void {
        this._renderers.forEach(renderer => renderer.render(context));
    }
}