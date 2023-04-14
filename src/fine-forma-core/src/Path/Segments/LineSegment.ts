import { Vector2 } from "Math";
import { Segment } from "./Segment";
import { IPathBuilder } from "Path/IPathBuilder";

export class LineSegment extends Segment {
    
    constructor(start: Vector2, end: Vector2) {
        super(start, end);
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}