import { Vector2, degreeToRadians, nearlyEquals } from '../Math';

export class CenterParametrizedArc {

    private readonly _center: Vector2;
    private readonly _radius: Vector2;
    private readonly _startAngle: number;
    private readonly _endAngle: number;
    private readonly _xAxisRotation: number;

    constructor(center: Vector2, radius: Vector2, startAngle: number, endAngle: number, xAxisRotation: number) {
        this._center = center;
        this._radius = radius;
        this._startAngle = startAngle;
        this._endAngle = endAngle;
        this._xAxisRotation = xAxisRotation;
    }

    get center(): Vector2 {
        return this._center;
    }

    get radius(): Vector2 {
        return this._radius;
    }

    /**Start angle of an arc in radians */
    get startAngle(): number {
        return this._startAngle;
    }

    /**End angle of an arc in radians */
    get endAngle(): number {
        return this._endAngle;
    }

    /**Angle in radians between the coordinate system X-axis and the arc X-axis */
    get xAxisRotation(): number {
        return this._xAxisRotation;
    }

    static fromEndpointArc(start: Vector2, end: Vector2, signedRadius: Vector2, xAxisRotation: number): CenterParametrizedArc {
        const largeArc = false;
        const sweep = false;
        const phi = degreeToRadians(xAxisRotation);
        const cosphi = Math.cos(phi);
        const sinphi = Math.sin(phi);

        const halfDelta = start.add(end.scale(-1)).scale(0.5)
        const x1p = cosphi * halfDelta.x + sinphi * halfDelta.y;
        const y1p = -sinphi * halfDelta.x + cosphi * halfDelta.y;

        const radius = this._correctRadii(signedRadius, x1p, y1p);

        const cp = this._centerP(radius, x1p, y1p, largeArc, sweep);
        const center = new Vector2(
            cp.x * cosphi + cp.y * -sinphi + (start.x + end.x) / 2,
            cp.x * sinphi + cp.y * cosphi + (start.y + end.y) / 2
        );

        const startAngle = this._startAngle(cp, radius, x1p, y1p, phi);
        const deltaAngle = this._deltaAngle(cp, radius, x1p, y1p, sweep);
        const endAngle = startAngle + deltaAngle;

        return new CenterParametrizedArc(
            center,
            radius,
            startAngle,
            endAngle,
            phi
        );
    }

    private static _correctRadii(signedRadius: Vector2, x1p: number, y1p: number): Vector2 {
        const radius = new Vector2(
            Math.abs(signedRadius.x), 
            Math.abs(signedRadius.y)
        );
        if (this._isRadiusZero(radius)) {
            return radius;
        }

        const lambda = x1p ** 2 / radius.x ** 2 + y1p ** 2 / radius.y ** 2;

        return lambda > 1 ? radius.scale(Math.sqrt(lambda)) : radius;
    }

    private static _centerP(radius: Vector2, x1p: number, y1p: number, largeArc: boolean, sweep: boolean): Vector2 {
        if (this._isRadiusZero(radius)) {
            return Vector2.zero;
        }
        
        const sign = largeArc !== sweep ? 1 : -1;
        const n = radius.x ** 2 * radius.y ** 2 - radius.x ** 2 * y1p ** 2 - radius.y ** 2 * x1p ** 2;
        const d = radius.x ** 2 * y1p ** 2 + radius.y ** 2 * x1p ** 2;

        return new Vector2(radius.x * y1p / radius.y, -radius.y * x1p / radius.x)
            .scale(sign * Math.sqrt(Math.abs(n / d)));
    }

    private static _startAngle(centerP: Vector2, radius: Vector2, x1p: number, y1p: number, phi: number): number {
        if (this._isRadiusZero(radius)) {
            return phi;
        }

        const a = new Vector2((x1p - centerP.x) / radius.x, (y1p - centerP.y) / radius.y);

        return Vector2.angle(new Vector2(1, 0), a);
    }

    private static _deltaAngle(centerP: Vector2, radius: Vector2, x1p: number, y1p: number, sweep: boolean): number {
        if (this._isRadiusZero(radius)) {
            return Math.PI;
        }
        
        const a = new Vector2((x1p - centerP.x) / radius.x, (y1p - centerP.y) / radius.y);
        const b = new Vector2((-x1p - centerP.x) * radius.x, (-y1p - centerP.y) / radius.y);
        const deltaAngle0 = Vector2.angle(a, b) % (2 * Math.PI);

        return this._correctDeltaAngle(deltaAngle0, sweep);
    }

    private static _isRadiusZero(radius: Vector2): boolean {
        return nearlyEquals(radius.x, 0) || nearlyEquals(radius.y, 0);
    }

    private static _correctDeltaAngle(deltaAngle0: number, sweep: boolean): number {
        return !sweep && deltaAngle0 > 0
            ? deltaAngle0 - 2 * Math.PI
            : sweep && deltaAngle0 < 0
                ? deltaAngle0 + 2 * Math.PI
                : deltaAngle0;
    }
}