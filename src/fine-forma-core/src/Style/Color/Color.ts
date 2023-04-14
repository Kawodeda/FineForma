import { ColorComponent } from "./ColorComponent";
import { IColorPreview } from "./IColorPreview";

export abstract class Color {

    private readonly _alpha: ColorComponent;

    constructor(alpha: ColorComponent) {
        this._alpha = alpha;
    }

    get alpha(): ColorComponent {
        return this._alpha;
    }

    abstract get preview(): IColorPreview;
}