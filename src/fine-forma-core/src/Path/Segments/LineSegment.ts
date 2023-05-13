import { Segment } from './Segment';
import { IPathBuilder } from './../IPathBuilder';
import { Bounds, Vector2 } from '../../Math';

export class LineSegment extends Segment {

    private readonly _bounds: Bounds;

    constructor(start: Vector2, end: Vector2) {
        super(start, end);

        this._bounds = Bounds.from([this.start, this.end]);
    }

    override get bounds(): Bounds {
        return this._bounds;
    }

    override addToPath(pathBuilder: IPathBuilder): void {
        pathBuilder.moveTo(this.start);
        pathBuilder.lineTo(this.end);
    }
}