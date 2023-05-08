import { Vector2 } from '../Math';
import { Transform } from '../Transform';
import { ViewportConstraints } from './ViewportConstraints';

export class Viewport {

    private readonly _constraints: ViewportConstraints;
    private readonly _scroll: Vector2;
    private readonly _zoom: number;
    private readonly _angle: number;

    constructor(constraints: ViewportConstraints, scroll: Vector2, zoom: number, angle: number) {
        this._validateComponents(constraints, scroll, zoom, angle);

        this._constraints = constraints;
        this._scroll = scroll;
        this._zoom = zoom;
        this._angle = angle;
    }

    get scroll(): Vector2 {
        return this._scroll;
    }

    get zoom(): number {
        return this._zoom;
    }

    get angle(): number {
        return this._angle;
    }

    get constraints(): ViewportConstraints {
        return this._constraints;
    }

    get transform(): Transform {
        return new Transform(this.scroll.negate(), new Vector2(this.zoom, this.zoom), -this.angle);
    }

    private _validateComponents(constraints: ViewportConstraints, scroll: Vector2, zoom: number, angle: number): void {
        if (!constraints.isValidScroll(scroll) 
        || !constraints.isValidZoom(zoom) 
        || !constraints.isValidAngle(angle)) {
            throw new Error('Could not create Viewport from non-valid parameters');
        }
    }
}