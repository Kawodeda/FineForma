import { Vector2 } from '../../Math';
import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class AddZoomAtCommand implements IViewportCommand {
    
    private readonly _delta: number;
    private readonly _center: Vector2;

    constructor(delta: number, center: Vector2) {
        this._delta = delta;
        this._center = center;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        const factor = (viewport.zoom + this._delta) / viewport.zoom;

        return Promise.resolve(
            Viewport.from(
                viewport.constraints, 
                viewport.size,
                viewport.transform.scaleAt(new Vector2(factor, factor), this._center.negate())
            )
        );
    }
}