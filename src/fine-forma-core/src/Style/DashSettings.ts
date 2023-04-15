export class DashSettings {

    private readonly _dashes: ReadonlyArray<number>;
    private readonly _dashOffset: number;

    constructor(dashes: readonly number[], dashOffset = 0) {
        this._dashes = dashes;
        this._dashOffset = dashOffset;
    }

    static get empty(): DashSettings {
        return new DashSettings([], 0);
    }

    get dashes(): ReadonlyArray<number> {
        return this._dashes;
    }

    get dashOffset(): number {
        return this._dashOffset;
    }
}