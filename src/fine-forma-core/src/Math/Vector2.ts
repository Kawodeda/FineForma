export class Vector2 {

    private readonly _x: number;
    private readonly _y: number;

    constructor(x: number, y: number) {
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
        other;
        return new Vector2(0, 0);
    }

    scale(factor: number): Vector2 {
        factor;
        return new Vector2(0, 0);
    }
}