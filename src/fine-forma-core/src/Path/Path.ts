import { Segment } from './Segments/Segment';
import { IPathBuilder } from './IPathBuilder';
import { arrayEquals } from '../ArrayUtils';
import { Bounds } from '../Math';

export abstract class Path {

    private readonly _segments: readonly Segment[];

    constructor(segments: readonly Segment[]) {
        this._segments = segments;
    }

    get segments(): readonly Segment[] {
        return this._segments;
    }

    get bounds(): Bounds {
        return Bounds.from(this.segments.flatMap(
            segment => [segment.bounds.corner1, segment.bounds.corner2])
        );
    }

    equals(other: Path): boolean {
        return arrayEquals(this.segments, other.segments, (a, b) => a.equals(b));
    }

    abstract build(pathBuilder: IPathBuilder): void;
}