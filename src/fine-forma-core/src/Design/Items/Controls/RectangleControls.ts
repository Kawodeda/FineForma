import { Rectangle, Vector2 } from '../../../Math';
import { ClosedPath } from '../../../Path/ClosedPath';
import { LineSegment } from '../../../Path/Segments/LineSegment';
import { IClosedShapeControls } from '../Interfaces/IClosedShapeControls';

export class RectangleControls implements IClosedShapeControls {

    private readonly _rectangle: Rectangle;

    constructor(corner1: Vector2, corner2: Vector2) {
        this._rectangle = new Rectangle(corner1, corner2);
    }

    get corner1(): Vector2 {
        return this._rectangle.corner1;
    }

    get corner2(): Vector2 {
        return this._rectangle.corner2;
    }

    get width(): number {
        return this._rectangle.width;
    }

    get height(): number {
        return this._rectangle.height;
    }

    get closedPath(): ClosedPath {
        const rightTop = this.corner1.add(new Vector2(this.width, 0));
        const leftBottom = this.corner1.add(new Vector2(0, this.height));

        return this._createRectanglePath(this.corner1, rightTop, this.corner2, leftBottom);
    }

    private _createRectanglePath(leftTop: Vector2, rightTop: Vector2, rightBottom: Vector2, leftBottom: Vector2): ClosedPath {
        return new ClosedPath([
            new LineSegment(leftTop, rightTop),
            new LineSegment(rightTop, rightBottom),
            new LineSegment(rightBottom, leftBottom),
            new LineSegment(leftBottom, leftTop)
        ]);
    }
}