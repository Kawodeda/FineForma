import { Segment } from './Segment';
import { IPathBuilder } from 'Path/IPathBuilder';

export class LineSegment extends Segment {

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}