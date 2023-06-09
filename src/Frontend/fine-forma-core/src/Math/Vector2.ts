import { clamp, isRealNumber, nearlyEquals } from './Utils';

export class Vector2 {

    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._validateElements(x, y);

        this._x = x;
        this._y = y;
    }

    static get zero(): Vector2 {
        return new Vector2(0, 0);
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get magnitude(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    /**
     * Angle in radians between two vectors
     */
    static angle(a: Vector2, b: Vector2): number {
        const sign = a.x * b.y - a.y * b.x >= 0 ? 1 : -1;

        return sign * Math.acos(
            clamp(a.dot(b) / (a.magnitude * b.magnitude), -1, 1)
        );
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    subtract(other: Vector2): Vector2 {
        return other
            .negate()
            .add(this);
    }

    scale(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    negate(): Vector2 {
        return this.scale(-1);
    }

    dot(other: Vector2): number {
        return this.x * other.x + this.y * other.y;
    }

    multiply(other: Vector2): Vector2 {
        return new Vector2(
            this.x * other.x,
            this.y * other.y
        );
    }

    equals(other: Vector2): boolean {
        return nearlyEquals(this.x, other.x) 
            && nearlyEquals(this.y, other.y);
    }

    private _validateElements(x: number, y: number): void {
        if (!isRealNumber(x) || !isRealNumber(y)) {
            throw new Error('Could not create Vector2 from non-real element values');
        }
    }
}