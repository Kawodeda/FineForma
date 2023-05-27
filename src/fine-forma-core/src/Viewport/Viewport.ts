import { Vector2, nearlyEquals } from '../Math';
import { Transform } from '../Transform';
import { IViewportConstraints } from './IViewportConstraints';

export class Viewport {

    private readonly _constraints: IViewportConstraints;
    private readonly _scroll: Vector2;
    private readonly _zoom: number;
    private readonly _angle: number;

    constructor(constraints: IViewportConstraints, scroll: Vector2, zoom: number, angle: number) {
        this._constraints = constraints;
        this._zoom = this.constraints.constrainZoom(zoom);
        this._scroll = this.constraints.constrainScroll(this.zoom, scroll);
        this._angle = this.constraints.constrainAngle(angle);
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

    get constraints(): IViewportConstraints {
        return this._constraints;
    }

    get transform(): Transform {
        return new Transform(this.scroll.negate(), new Vector2(this.zoom, this.zoom), -this.angle);
    }

    static from(constraints: IViewportConstraints, transform: Transform): Viewport {
        if (!nearlyEquals(transform.scaleFactor.x, transform.scaleFactor.y)) {
            throw new Error('Scale must be the same for all axis');
        }

        return new Viewport(
            constraints,
            transform.shift.negate(), 
            transform.scaleFactor.x, 
            -transform.angle
        );
    }

    setConstraints(constraints: IViewportConstraints): Viewport {
        return new Viewport(
            constraints,
            this.scroll,
            this.zoom,
            this.angle
        );
    }

    equals(other: Viewport): boolean {
        return this.scroll.equals(other.scroll)
            && nearlyEquals(this.zoom, other.zoom)
            && nearlyEquals(this.angle, other.angle);
    }
}