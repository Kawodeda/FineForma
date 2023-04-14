import { Segment } from "./Segment";
import { IPathBuilder } from './IPathBuilder';

export abstract class Path {

    private readonly _segments: ReadonlyArray<Segment>;

    constructor(segments: readonly Segment[]) {
        this._segments = segments;
    }

    protected get segments(): ReadonlyArray<Segment> {
        return this._segments;
    }

    abstract build(pathBuilder: IPathBuilder): void;
}