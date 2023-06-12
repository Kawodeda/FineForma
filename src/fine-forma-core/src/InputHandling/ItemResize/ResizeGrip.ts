import { Rectangle, Vector2 } from '../../Math';

export class ResizeGrip {

    private readonly _bounds: (selectionBounds: Rectangle) => Rectangle;
    private readonly _resizeFactor: Vector2;

    constructor(bounds: (selectionBounds: Rectangle) => Rectangle, resizeFactor: Vector2) {
        this._bounds = bounds;
        this._resizeFactor = resizeFactor;
    }

    getBounds(selectionBounds: Rectangle): Rectangle {
        return this._bounds(selectionBounds);
    }

    resizeRectangle(rectangle: Rectangle, gripShift: Vector2): Rectangle {
        return new Rectangle(
            rectangle.corner1.add(this._getCorner1Shift(gripShift)),
            rectangle.corner2.add(this._getCorner2Shift(gripShift))
        );
    }

    private _getCorner1Shift(gripShift: Vector2): Vector2 {
        return new Vector2(
            this._resizeFactor.x < 0 ? Math.abs(this._resizeFactor.x) * gripShift.x : 0,
            this._resizeFactor.y < 0 ? Math.abs(this._resizeFactor.y) * gripShift.y : 0
        );
    }

    private _getCorner2Shift(gripShift: Vector2): Vector2 {
        return new Vector2(
            this._resizeFactor.x > 0 ? this._resizeFactor.x * gripShift.x : 0,
            this._resizeFactor.y > 0 ? this._resizeFactor.y * gripShift.y : 0
        );
    }
}