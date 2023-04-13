import { isRealNumber, nearlyEquals } from "./Utils";

export class Vector2 {

    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
        this._validateElements(x, y);

        this._x = x;
        this._y = y;
    }

    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    add(other: Vector2): Vector2 {
        return new Vector2(this.x + other.x, this.y + other.y);
    }

    scale(factor: number): Vector2 {
        return new Vector2(this.x * factor, this.y * factor);
    }

    equals(other: Vector2): boolean {
        return nearlyEquals(this.x, other.x) 
            && nearlyEquals(this.y, other.y);
    }

    private _validateElements(x: number, y: number) {
        if(!isRealNumber(x) || !isRealNumber(y)) {
            throw new Error('Could not create Vector2 from non-real element values');
        }
    }
}