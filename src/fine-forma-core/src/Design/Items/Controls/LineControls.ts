import { Vector2 } from '../../../Math';
import { OpenPath } from '../../../Path/OpenPath';
import { LineSegment } from '../../../Path/Segments/LineSegment';
import { IOpenShapeControls } from '../Interfaces/IOpenShapeControls';

export class LineControls implements IOpenShapeControls {

    private readonly _start: Vector2;
    private readonly _end: Vector2;

    constructor(start: Vector2, end: Vector2) {
        this._start = start;
        this._end = end;
    }

    get start(): Vector2 {
        return this._start;
    }

    get end(): Vector2 {
        return this._end;
    }

    get openPath(): OpenPath {
        return new OpenPath([ 
            new LineSegment(this._start, this._end)
        ]);
    }
}