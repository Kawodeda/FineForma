import { Vector2 } from './../../Math';
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

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.arcTo(this._radius.x, this._radius.y, this._xAxisRotation, this.end);
    }
}