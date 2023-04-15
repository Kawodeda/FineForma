import { Segment } from './Segments/Segment';
import { IPathBuilder } from './IPathBuilder';

export abstract class Path {

    private readonly _segments: readonly Segment[];

    constructor(segments: readonly Segment[]) {
        this._segments = segments;
    }

    get segments(): readonly Segment[] {
        return this._segments;
    }

    abstract build(pathBuilder: IPathBuilder): void;
}