import { Vector2 } from "Math";
import { Segment } from "./Segment";
import { IPathBuilder } from "Path/IPathBuilder";

export class CubicBezierSegment extends Segment {

    private readonly _control1: Vector2;
    private readonly _control2: Vector2;

    constructor(start: Vector2, control1: Vector2, control2: Vector2, end: Vector2) {
        super(start, end);

        this._control1 = control1;
        this._control2 = control2;
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.cubicCurveTo(this._control1, this._control2, this.end);
    }
}