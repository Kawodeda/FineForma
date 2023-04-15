import { Vector2 } from '../../../Math';
import { ClosedPath } from '../../../Path/ClosedPath';
import { ArcSegment } from '../../../Path/Segments/ArcSegment';
import { IClosedShapeControls } from '../Interfaces/IClosedShapeControls';
import { RectangleControls } from './RectangleControls';

export class EllipseControls implements IClosedShapeControls {

    private readonly _rectangle: RectangleControls;

    constructor(rectangle: RectangleControls) {
        this._rectangle = rectangle;
    }

    get rectangle(): RectangleControls {
        return this._rectangle;
    }

    get radius(): Vector2 {
        return new Vector2(
            this._rectangle.width / 2, 
            this._rectangle.height / 2
        );
    }

    get closedPath(): ClosedPath {
        const leftMiddlePoint = this._rectangle.corner1.add(
            new Vector2(0, this._rectangle.height / 2));
        const rightMiddlePoint = this._rectangle.corner2.add(
            new Vector2(0, -this._rectangle.height / 2));

        return this._createEllipsePath(leftMiddlePoint, rightMiddlePoint, this.radius);
    }

    private _createEllipsePath(leftMiddlePoint: Vector2, rightMiddlePoint: Vector2, radius: Vector2): ClosedPath {
        return new ClosedPath([
            new ArcSegment(leftMiddlePoint, rightMiddlePoint, radius),
            new ArcSegment(rightMiddlePoint, leftMiddlePoint, radius)
        ]);
    }
}