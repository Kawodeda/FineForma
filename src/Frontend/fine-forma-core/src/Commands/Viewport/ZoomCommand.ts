import { Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class ZoomCommand implements IViewportCommand {
    
    private readonly _factor: number;

    constructor(factor: number) {
        this._factor = factor;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        return Promise.resolve(
            new Viewport(
                viewport.constraints,
                viewport.scroll,
                viewport.zoom * this._factor,
                viewport.angle
            )
        );
    }
}