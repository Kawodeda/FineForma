import { arrayEquals } from '../ArrayUtils';
import { nearlyEquals } from '../Math';

export class DashSettings {

    private readonly _dashes: readonly number[];
    private readonly _dashOffset: number;

    constructor(dashes: readonly number[], dashOffset = 0) {
        this._dashes = dashes;
        this._dashOffset = dashOffset;
    }

    static get empty(): DashSettings {
        return new DashSettings([], 0);
    }
    
    get dashes(): readonly number[] {
        return this._dashes;
    }

    get dashOffset(): number {
        return this._dashOffset;
    }

    equals(other: DashSettings): boolean {
        return arrayEquals(this.dashes, other.dashes, nearlyEquals)
            && nearlyEquals(this.dashOffset, other.dashOffset);
    }
}