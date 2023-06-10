import { Vector2 } from './Vector2';
import { Rectangle } from './Rectangle';

export class Margin {

    private readonly _rectangle: Rectangle;

    constructor(left: number, top: number, right: number, bottom: number) {
        this._rectangle = new Rectangle(new Vector2(-left, -top), new Vector2(right, bottom));
    }

    get rectangle(): Rectangle {
        return this._rectangle;
    }

    get left(): number {
        return this._rectangle.corner1.x;
    }

    get top(): number {
        return this._rectangle.corner1.y;
    }

    get right(): number {
        return this._rectangle.corner2.x;
    }

    get bottom(): number {
        return this._rectangle.corner2.y;
    }

    equals(other: Margin): boolean {
        return this.rectangle.equals(other.rectangle);
    }
}