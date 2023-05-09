import { Bounds, Vector2 } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';

export class QuadraticBezierSegment extends Segment {

    private readonly _control: Vector2;

    constructor(start: Vector2, control: Vector2, end: Vector2) {
        super(start, end);

        this._control = control;
    }

    get control(): Vector2 {
        return this._control;
    }

    override get bounds(): Bounds {
        throw new Error();
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.quadraticCurveTo(this._control, this.end);
    }

    override equals(other: QuadraticBezierSegment): boolean {
        return super.equals(other)
            && this.control.equals(other.control);
    }
}