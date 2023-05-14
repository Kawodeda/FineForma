import { Bounds, Vector2, nearlyInRange, quadraticEquation } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { Transform } from '../../Transform';

export class CubicBezierSegment extends Segment {

    private readonly _control1: Vector2;
    private readonly _control2: Vector2;
    private readonly _bounds: Bounds;

    constructor(start: Vector2, control1: Vector2, control2: Vector2, end: Vector2) {
        super(start, end);

        this._control1 = control1;
        this._control2 = control2;
        this._bounds = Bounds.from(this._extremes);
    }

    get control1(): Vector2 {
        return this._control1;
    }

    get control2(): Vector2 {
        return this._control2;
    }

    override get bounds(): Bounds {
        return this._bounds;
    }

    private get _extremes(): Vector2[] {
        const a = this._derivativeTermA;
        const b = this._derivativeTermB;
        const c = this._derivativeTermC;
        const secondExtremeX = -b.x / (2 * a.x);
        const secondExtremeY = -b.y / (2 * a.y);

        return [secondExtremeX, secondExtremeY]
            .concat(quadraticEquation(a.x, b.x, c.x))
            .concat(quadraticEquation(a.y, b.y, c.y))
            .filter(t => nearlyInRange(t, 0, 1))
            .map(t => this._curveAt(t))
            .concat([this.start, this.end]);
    }

    private get _derivativeTermA(): Vector2 {
        return this.start
            .negate()
            .add(this.control1.scale(3))
            .add(this.control2.scale(-3))
            .add(this.end)
            .scale(3);
    }

    private get _derivativeTermB(): Vector2 {
        return this.start
            .add(this.control1.scale(-2))
            .add(this.control2)
            .scale(6);
    }

    private get _derivativeTermC(): Vector2 {
        return this.start
            .negate()
            .add(this.control1)
            .scale(3);
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.cubicCurveTo(this._control1, this._control2, this.end);
    }

    override transform(transform: Transform): CubicBezierSegment {
        return new CubicBezierSegment(
            transform.applyTo(this.start),
            transform.applyTo(this.control1),
            transform.applyTo(this.control2),
            transform.applyTo(this.end)
        );
    }

    override equals(other: CubicBezierSegment): boolean {
        return super.equals(other)
            && this.control1.equals(other.control1)
            && this.control2.equals(other.control2);
    }

    private _curveAt(t: number): Vector2 {
        return this.start
            .scale((1 - t) ** 3)
            .add(this.control1.scale(3 * (1 - t) ** 2 * t))
            .add(this.control2.scale(3 * (1 - t) * t ** 2))
            .add(this.end.scale(t ** 3));
    }
}