import { Bounds, Vector2, nearlyInRange } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';

export class QuadraticBezierSegment extends Segment {

    private readonly _control: Vector2;
    private readonly _bounds: Bounds;

    constructor(start: Vector2, control: Vector2, end: Vector2) {
        super(start, end);

        this._control = control;
        this._bounds = Bounds.from(this._extremes);
    }

    get control(): Vector2 {
        return this._control;
    }

    override get bounds(): Bounds {
        return this._bounds;
    }

    private get _extremes(): Vector2[] {
        const tExtremeX = (this.start.x - this.control.x) 
            / (this.end.x - 2 * this.control.x + this.start.x);
        const tExtremeY = (this.start.y - this.control.y) 
            / (this.end.y - 2 * this.control.y + this.start.y);

        return [tExtremeX, tExtremeY]
            .filter(t => nearlyInRange(t, 0, 1))
            .map(t => this._curveAt(t))
            .concat([
                this.start, 
                this.end
            ]);
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.quadraticCurveTo(this._control, this.end);
    }

    override equals(other: QuadraticBezierSegment): boolean {
        return super.equals(other)
            && this.control.equals(other.control);
    }

    private _curveAt(t: number): Vector2 {
        return this.start.scale((1 - t) ** 2)
            .add(this.control.scale(2 * (1 - t) * t))
            .add(this.end.scale(t ** 2));
    }
}