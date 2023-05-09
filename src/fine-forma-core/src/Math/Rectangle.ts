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
}