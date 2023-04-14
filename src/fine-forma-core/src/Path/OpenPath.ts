import { IPathBuilder } from "./IPathBuilder";
import { Path } from "./Path";
import { Segment } from "./Segments/Segment";

export class OpenPath extends Path {

    constructor(segments: readonly Segment[]) {
        super(segments);
    }

    override build(pathBuilder: IPathBuilder): void {
        pathBuilder.beginPath();
        for(const segment of this.segments) {
            segment.addToPath(pathBuilder);
        }
    }
}