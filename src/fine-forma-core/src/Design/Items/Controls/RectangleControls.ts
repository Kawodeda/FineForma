import { Vector2 } from '../../../Math';
import { ClosedPath } from '../../../Path/ClosedPath';
import { LineSegment } from '../../../Path/Segments/LineSegment';
import { IClosedShapeControls } from '../Interfaces/IClosedShapeControls';

export class RectangleControls implements IClosedShapeControls {

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

    get width(): number {
        return this._corner2.x - this._corner1.x;
    }

    get height(): number {
        return this._corner2.y - this._corner1.y;
    }

    get closedPath(): ClosedPath {
        const rightTop = this._corner1.add(new Vector2(this.width, 0));
        const leftBottom = this._corner1.add(new Vector2(0, this.height));

        return this._createRectanglePath(this._corner1, rightTop, this._corner2, leftBottom);
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