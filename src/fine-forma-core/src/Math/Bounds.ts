import { Rectangle } from './Rectangle';
import { Vector2 } from './Vector2';

export class Bounds {

    private readonly _rectangle: Rectangle;

    constructor(corner1: Vector2, corner2: Vector2) {
        this._rectangle = this._toBoundsRectangle(corner1, corner2);
    }

    get rectangle(): Rectangle {
        return this._rectangle;
    }

    get corner1(): Vector2 {
        return this._rectangle.corner1;
    }

    get corner2(): Vector2 {
        return this._rectangle.corner2;
    }

    static from(points: readonly Vector2[]): Bounds {
        if (points.length === 0) {
            throw new Error('Could not create Bounds for empty point list');
        }

        const corner1 = points.reduce(
            (result, point) => Bounds._minPoint(result, point), 
            points[0] ?? Vector2.zero
        );
        const corner2 = points.reduce(
            (result, point) => Bounds._maxPoint(result, point), 
            points[0] ?? Vector2.zero
        );

        return new Bounds(corner1, corner2);
    }

    private static _minPoint(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(
            Math.min(a.x, b.x), 
            Math.min(a.y, b.y)
        );
    }

    private static _maxPoint(a: Vector2, b: Vector2): Vector2 {
        return new Vector2(
            Math.max(a.x, b.x), 
            Math.max(a.y, b.y)
        );
    }

    equals(other: Bounds): boolean {
        return this.rectangle.equals(other.rectangle);
    }

    private _toBoundsRectangle(corner1: Vector2, corner2: Vector2): Rectangle {
        return new Rectangle(
            Bounds._minPoint(corner1, corner2),
            Bounds._maxPoint(corner1, corner2)
        );
    }
}