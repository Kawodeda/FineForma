import { Vector2 } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';

export class QuadraticBezierSegment extends Segment {

    private readonly _control: Vector2;

    constructor(start: Vector2, control: Vector2, end: Vector2) {
        super(start, end);

        this._control = control;
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.quadraticCurveTo(this._control, this.end);
    }
}