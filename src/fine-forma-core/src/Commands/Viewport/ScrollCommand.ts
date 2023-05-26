import { Vector2 } from '../../Math';
import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class ScrollCommand implements IViewportCommand {
    
    private readonly _delta: Vector2;

    constructor(delta: Vector2) {
        this._delta = delta;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        return Promise.resolve(
            new Viewport(
                viewport.constraints,
                viewport.size, 
                viewport.scroll.add(this._delta), 
                viewport.zoom, 
                viewport.angle
            )
        );
    }
}