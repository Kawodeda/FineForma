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
        if (!viewport.constraints.isValidZoom(viewport.zoom + this._delta)) {
            return Promise.resolve(viewport);
        }

        const factor = (viewport.zoom + this._delta) / viewport.zoom;

        return Promise.resolve(
            Viewport.from(
                viewport.constraints,
                viewport.transform.scaleAt(new Vector2(factor, factor), this._center.negate())
            )
        );
    }
}