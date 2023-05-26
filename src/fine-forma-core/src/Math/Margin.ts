import { Rectangle } from './Rectangle';

export class Margin {

    private readonly _rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this._rectangle = rectangle;
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
}