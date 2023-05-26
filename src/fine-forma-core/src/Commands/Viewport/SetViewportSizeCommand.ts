import { Vector2 } from '../../Math';
import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class SetViewportSizeCommand implements IViewportCommand {
    
    private readonly _size: Vector2;

    constructor(size: Vector2) {
        this._size = size;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        return Promise.resolve(
            new Viewport(
                viewport.constraints,
                this._size,
                viewport.scroll,
                viewport.zoom,
                viewport.angle
            )
        );
    }
}