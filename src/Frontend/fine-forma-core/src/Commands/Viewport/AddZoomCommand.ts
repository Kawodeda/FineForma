import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class AddZoomCommand implements IViewportCommand {
    
    private readonly _delta: number;

    constructor(delta: number) {
        this._delta = delta;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        if (!viewport.constraints.isValidZoom(viewport.zoom + this._delta)) {
            return Promise.resolve(viewport);
        }

        return Promise.resolve(
            new Viewport(
                viewport.constraints,
                viewport.scroll,
                viewport.zoom + this._delta,
                viewport.angle
            )
        );
    }
}