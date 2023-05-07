import { Vector2 } from './Math';
import { Transform } from './Transform';

export class Viewport {

    private readonly _scroll: Vector2;
    private readonly _zoom: number;
    private readonly _angle: number;

    constructor(scroll: Vector2, zoom: number, angle: number) {
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

    get transform(): Transform {
        return new Transform(this.scroll, new Vector2(this.zoom, this.zoom), this.angle);
    }
}