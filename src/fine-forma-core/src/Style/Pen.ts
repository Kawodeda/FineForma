import { Brush } from './Brush';
import { DashSettings } from './DashSettings';

export class Pen {

    private readonly _style: Brush;
    private readonly _width: number;
    private readonly _dash: DashSettings;

    constructor(style: Brush, width: number, dash = DashSettings.empty) {
        this._style = style;
        this._width = width;
        this._dash = dash;
    }

    get style(): Brush {
        return this._style;
    }

    get width(): number {
        return this._width;
    }

    get dash(): DashSettings {
        return this._dash;
    }
}