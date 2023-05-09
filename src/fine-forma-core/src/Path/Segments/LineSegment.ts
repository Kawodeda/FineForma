import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { Rectangle, Vector2 } from '../../Math';

export class LineSegment extends Segment {

    override get bounds(): Rectangle {
        const corner1 = new Vector2(
            Math.min(this.start.x, this.end.x),
            Math.min(this.start.y, this.end.y)
        );
        const corner2 = new Vector2(
            Math.max(this.start.x, this.end.x),
            Math.max(this.start.y, this.end.y)
        );

        return new Rectangle(corner1, corner2);
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}