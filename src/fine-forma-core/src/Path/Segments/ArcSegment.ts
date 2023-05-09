import { Bounds, Vector2, angleToPositive, nearlyEquals } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { CenterParametrizedArc } from '../ArcParametrization';

export class ArcSegment extends Segment {

    private readonly _radius: Vector2;
    private readonly _xAxisRotation: number;
    private readonly _centerParametrized: CenterParametrizedArc;

    constructor(start: Vector2, end: Vector2, radius: Vector2, xAxisRotation = 0) {
        super(start, end);

        this._radius = radius;
        this._xAxisRotation = xAxisRotation;
        this._centerParametrized = CenterParametrizedArc.fromEndpointArc(this.start, this.end, this.radius, this.xAxisRotation);
    }

    get radius(): Vector2 {
        return this._radius;
    }

    get xAxisRotation(): number {
        return this._xAxisRotation;
    }

    override get bounds(): Bounds {
        const radius = this._centerParametrized.radius;
        const phi = this._centerParametrized.xAxisRotation;

        const thetaX1 = -Math.atan(radius.y * Math.tan(phi) / radius.x);
        const thetaY1 = Math.atan(radius.y / (Math.tan(phi) * radius.x));
        const thetaX2 = Math.PI - thetaX1;
        const thetaY2 = Math.PI + thetaY1;

        return Bounds.from([
            ...this._pointsOfArc([thetaX1, thetaX2, thetaY1, thetaY2]),
            this.start,
            this.end
        ]);
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

    private _ellipseAt(theta: number): Vector2 {
        const center = this._centerParametrized.center;
        const radius = this._centerParametrized.radius;
        const phi = this._centerParametrized.xAxisRotation;

        return new Vector2(
            center.x + radius.x * Math.cos(theta) * Math.cos(phi) - radius.y * Math.sin(theta) * Math.sin(phi),
            center.y + radius.x * Math.cos(theta) * Math.sin(phi) + radius.y * Math.sin(theta) * Math.cos(phi)
        );
    }

    private _pointsOfArc(thetas: number[]): Vector2[] {
        const startAngle = this._centerParametrized.endAngle < 0 
            ? Math.PI * 2 + this._centerParametrized.endAngle
            : this._centerParametrized.endAngle;
        const endAngle = this._centerParametrized.endAngle < 0 
            ? Math.PI * 2 + this._centerParametrized.startAngle
            : this._centerParametrized.startAngle;

        return thetas
            .filter(theta => (theta > startAngle || nearlyEquals(theta, startAngle))
                && (theta < endAngle || nearlyEquals(theta, endAngle)))
            .map(theta => this._ellipseAt(theta));
    }
}