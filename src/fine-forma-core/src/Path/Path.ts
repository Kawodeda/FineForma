import { Segment } from './Segments/Segment';
import { IPathBuilder } from './IPathBuilder';
import { arrayEquals } from '../ArrayUtils';
import { Rectangle, Vector2 } from '../Math';

export abstract class Path {

    private readonly _segments: readonly Segment[];

    constructor(segments: readonly Segment[]) {
        this._segments = segments;
    }

    get segments(): readonly Segment[] {
        return this._segments;
    }

    get bounds(): Rectangle {
        if (this.segments.length <= 0) {
            throw new Error('Could not get bounds of an empty path');
        }

        let corner1 = this.segments[0]?.bounds.corner1 ?? Vector2.zero;
        let corner2 = this.segments[0]?.bounds.corner2 ?? Vector2.zero;
        for (const bounds of this.segments.slice(1).map(segment => segment.bounds)) {
            corner1 = new Vector2(
                Math.min(bounds.corner1.x, corner1.x), 
                Math.min(bounds.corner1.y, corner1.y)
            );
            corner2 = new Vector2(
                Math.max(bounds.corner2.x, corner2.x), 
                Math.max(bounds.corner2.y, corner2.y)
            );
        }

        return new Rectangle(corner1, corner2);
    }

    equals(other: Path): boolean {
        return arrayEquals(this.segments, other.segments, (a, b) => a.equals(b));
    }

    abstract build(pathBuilder: IPathBuilder): void;
}