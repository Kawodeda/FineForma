import { ColorComponent } from "./ColorComponent";
import { IColorPreview } from "./IColorPreview";

export class ColorPreview implements IColorPreview {

    private readonly _r: ColorComponent;
    private readonly _g: ColorComponent;
    private readonly _b: ColorComponent;
    private readonly _alpha: ColorComponent;

    constructor(r: ColorComponent, g: ColorComponent, b: ColorComponent, alpha: ColorComponent) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._alpha = alpha;
    }

    get r(): ColorComponent {
        return this._r;
    }

    get g(): ColorComponent {
        return this._g;
    }

    get b(): ColorComponent {
        return this._b;
    }

    get alpha(): ColorComponent {
        return this._alpha;
    }
}