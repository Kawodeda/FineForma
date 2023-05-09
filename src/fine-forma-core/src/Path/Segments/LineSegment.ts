import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { Bounds } from '../../Math';

export class LineSegment extends Segment {

    override get bounds(): Bounds {
        return Bounds.from([this.start, this.end]);
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}