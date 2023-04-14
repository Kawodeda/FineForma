import { Vector2 } from "Math";
import { IPathBuilder } from "../IPathBuilder";

export abstract class Segment {

    private readonly _start: Vector2;
    private readonly _end: Vector2;

    constructor(start: Vector2, end: Vector2) {
        this._start = start;
        this._end = end;
    }

    get start(): Vector2 {
        return this._start;
    }

    get end(): Vector2 {
        return this._end;
    }

    abstract addToPath(pathBuilder: IPathBuilder): void;
}