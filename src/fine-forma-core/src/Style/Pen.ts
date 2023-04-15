import { Color } from "./Color/Color";
import { DashSettings } from "./DashSettings";

export class Pen {

    private readonly _color: Color;
    private readonly _width: number;
    private readonly _dash: DashSettings;

    constructor(color: Color, width: number, dash = DashSettings.empty) {
        this._color = color;
        this._width = width;
        this._dash = dash;
    }

    get color(): Color {
        return this._color;
    }

    get width(): number {
        return this._width;
    }

    get dash(): DashSettings {
        return this._dash;
    }
}