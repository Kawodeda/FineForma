import { Vector2, nearlyEquals } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';

export class ArcSegment extends Segment {

    private readonly _radius: Vector2;
    private readonly _xAxisRotation: number;

    constructor(start: Vector2, end: Vector2, radius: Vector2, xAxisRotation = 0) {
        super(start, end);

        this._radius = radius;
        this._xAxisRotation = xAxisRotation;
    }

    get radius(): Vector2 {
        return this._radius;
    }

    get xAxisRotation(): number {
        return this._xAxisRotation;
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.arcTo(this._radius.x, this._radius.y, this._xAxisRotation, this.end);
    }

    override equals(other: ArcSegment): boolean {
        return super.equals(other)
            && this.radius.equals(other.radius)
            && nearlyEquals(this.xAxisRotation, other.xAxisRotation);
    }
}