import { Vector2, nearlyEquals } from '../Math';
import { Transform } from '../Transform';
import { ViewportConstraints } from './ViewportConstraints';

export class Viewport {

    private readonly _constraints: ViewportConstraints;
    private readonly _size: Vector2;
    private readonly _scroll: Vector2;
    private readonly _zoom: number;
    private readonly _angle: number;

    constructor(constraints: ViewportConstraints, size: Vector2, scroll: Vector2, zoom: number, angle: number) {
        this._validateComponents(constraints, size, scroll, zoom, angle);

        this._constraints = constraints;
        this._size = size;
        this._scroll = scroll;
        this._zoom = zoom;
        this._angle = angle;
    }

    get size(): Vector2 {
        return this._size;
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

    static from(constraints: ViewportConstraints, size: Vector2, transform: Transform): Viewport {
        if (!nearlyEquals(transform.scaleFactor.x, transform.scaleFactor.y)) {
            throw new Error('Scale must be the same for all axis');
        }

        return new Viewport(
            constraints,
            size, 
            transform.shift.negate(), 
            transform.scaleFactor.x, 
            -transform.angle
        );
    }

    equals(other: Viewport): boolean {
        return this.constraints.equals(other.constraints)
            && this.scroll.equals(other.scroll)
            && nearlyEquals(this.zoom, other.zoom)
            && nearlyEquals(this.angle, other.angle);
    }

    private _validateComponents(constraints: ViewportConstraints, size: Vector2, scroll: Vector2, zoom: number, angle: number): void {
        if (!constraints.isValidScroll(scroll, zoom, size) 
        || !constraints.isValidZoom(zoom) 
        || !constraints.isValidAngle(angle)) {
            throw new Error('Could not create Viewport from non-valid parameters');
        }
    }
}