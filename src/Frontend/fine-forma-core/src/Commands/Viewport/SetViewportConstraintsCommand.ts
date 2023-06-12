import { IViewportConstraints, Viewport } from '../../Viewport';
import { IViewportCommand } from '../Interfaces';

export class SetViewportConstraintsCommand implements IViewportCommand {
    
    private readonly _constraints: IViewportConstraints;

    constructor(constraints: IViewportConstraints) {
        this._constraints = constraints;
    }

    execute(viewport: Viewport): Promise<Viewport> {
        return Promise.resolve(
            new Viewport(
                this._constraints,
                viewport.scroll,
                viewport.zoom,
                viewport.angle
            )
        );
    }
}