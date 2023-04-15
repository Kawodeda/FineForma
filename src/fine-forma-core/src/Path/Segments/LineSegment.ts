import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';

export class LineSegment extends Segment {

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}