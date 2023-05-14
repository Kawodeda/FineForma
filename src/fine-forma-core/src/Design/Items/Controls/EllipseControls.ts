import { Rectangle, Vector2 } from '../../../Math';
import { ClosedPath } from '../../../Path/ClosedPath';
import { ArcSegment } from '../../../Path/Segments/ArcSegment';
import { Transform } from '../../../Transform';
import { IClosedShapeControls } from '../Interfaces/IClosedShapeControls';

export class EllipseControls implements IClosedShapeControls {

    private readonly _rectangle: Rectangle;

    constructor(rectangle: Rectangle) {
        this._rectangle = rectangle;
    }

    get rectangle(): Rectangle {
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

    transform(transform: Transform): EllipseControls {
        return new EllipseControls(
            new Rectangle(
                transform.applyTo(this._rectangle.corner1),
                transform.applyTo(this._rectangle.corner2)
            )
        );
    }

    private _createEllipsePath(leftMiddlePoint: Vector2, rightMiddlePoint: Vector2, radius: Vector2): ClosedPath {
        return new ClosedPath([
            new ArcSegment(leftMiddlePoint, rightMiddlePoint, radius),
            new ArcSegment(rightMiddlePoint, leftMiddlePoint, radius)
        ]);
    }
}