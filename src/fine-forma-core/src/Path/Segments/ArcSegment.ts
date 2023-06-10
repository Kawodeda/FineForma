import { Bounds, Vector2, angleToPositive, nearlyEquals, nearlyInRange } from './../../Math';
import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { CenterParametrizedArc } from '../ArcParametrization';
import { Transform } from '../../Transform';

export class ArcSegment extends Segment {

    private readonly _radius: Vector2;
    private readonly _xAxisRotation: number;
    private readonly _centerParametrized: CenterParametrizedArc;
    private readonly _bounds: Bounds;

    constructor(start: Vector2, end: Vector2, radius: Vector2, xAxisRotation = 0) {
        super(start, end);

        this._radius = radius;
        this._xAxisRotation = xAxisRotation;
        this._centerParametrized = CenterParametrizedArc.fromEndpointArc(this.start, this.end, this.radius, this.xAxisRotation);
        this._bounds = Bounds.from(this._extremes);
    }

    get radius(): Vector2 {
        return this._radius;
    }

    get xAxisRotation(): number {
        return this._xAxisRotation;
    }

    override get bounds(): Bounds {
        return this._bounds;
    }

    private get _extremes(): Vector2[] {
        const radius = this._centerParametrized.radius;
        if (nearlyEquals(radius.x, 0) || nearlyEquals(radius.y, 0)) {
            return [this.start, this.end];
        }

        const phi = this._centerParametrized.xAxisRotation;
        const thetaX1 = -Math.atan(radius.y * Math.tan(phi) / radius.x);
        const thetaY1 = Math.atan(radius.y / (Math.tan(phi) * radius.x));
        const thetaX2 = Math.PI + thetaX1;
        const thetaY2 = Math.PI + thetaY1;

        return [
            ...this._pointsOfArc([thetaX1, thetaX2, thetaY1, thetaY2]),
            this.start,
            this.end
        ];
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.arcTo(this._radius.x, this._radius.y, this._xAxisRotation, this.end);
    }

    override transform(transform: Transform): ArcSegment {
        return new ArcSegment(
            transform.applyTo(this.start),
            transform.applyTo(this.end),
            this.radius.multiply(transform.scaleFactor),
            this.xAxisRotation
        );
    }

    override equals(other: ArcSegment): boolean {
        return super.equals(other)
            && this.radius.equals(other.radius)
            && nearlyEquals(this.xAxisRotation, other.xAxisRotation);
    }

    private _pointsOfArc(thetas: number[]): Vector2[] {
        return thetas
            .filter(theta => this._containsAngle(theta))
            .map(theta => this._ellipseAt(theta));
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

    private _containsAngle(theta: number): boolean {
        theta = angleToPositive(theta);
        const startAngle = angleToPositive(this._centerParametrized.startAngle);
        const endAngle = angleToPositive(this._centerParametrized.endAngle);

        if (this._centerParametrized.anticlockwise) {
            if (endAngle < startAngle) {
                return nearlyInRange(theta, endAngle, startAngle);
            }

            return nearlyInRange(theta, 0, startAngle) 
                || nearlyInRange(theta, endAngle, Math.PI * 2);
        }
        else {
            return nearlyInRange(theta, startAngle, endAngle);
        }
    }
}