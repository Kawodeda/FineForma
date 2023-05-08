import { Segment } from './Segments/Segment';
import { IPathBuilder } from './IPathBuilder';
import { arrayEquals } from '../ArrayUtils';

export abstract class Path {

    private readonly _segments: readonly Segment[];

    constructor(segments: readonly Segment[]) {
        this._segments = segments;
    }

    get segments(): readonly Segment[] {
        return this._segments;
    }

    equals(other: Path): boolean {
        return arrayEquals(this.segments, other.segments, (a, b) => a.equals(b));
    }

    abstract build(pathBuilder: IPathBuilder): void;
}