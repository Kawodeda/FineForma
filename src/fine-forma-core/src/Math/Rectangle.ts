import { Vector2 } from './Vector2';

export class Rectangle {

    private readonly _corner1: Vector2;
    private readonly _corner2: Vector2;

    constructor(corner1: Vector2, corner2: Vector2) {
        this._corner1 = corner1;
        this._corner2 = corner2;
    }

    get corner1(): Vector2 {
        return this._corner1;
    }

    get corner2(): Vector2 {
        return this._corner2;
    }

    get center(): Vector2 {
        return this.corner1
            .add(this.corner2)
            .scale(1 / 2);
    }

    get width(): number {
        return this.corner2.x - this.corner1.x;
    }

    get height(): number {
        return this.corner2.y - this.corner1.y;
    }

    equals(other: Rectangle): boolean {
        return this.corner1.equals(other.corner1)
            && this.corner2.equals(other.corner2);
    }
}