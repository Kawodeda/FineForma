import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class AddZoomCommand implements IViewportCommand {
    
    private readonly _delta: number;

    constructor(delta: number) {
        this._delta = delta;
    }

    execute(viewport: Viewport): Promise<Viewport> {
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