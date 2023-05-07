import { Brush } from './Brush';
import { RgbColor } from './Color';
import { Color } from './Color/Color';
import { IFillStyleContext } from './IFillStyleContext';

export class SolidBrush extends Brush {

    private readonly _color: Color;

    constructor(color: Color) {
        super();

        this._color = color;
    }

    static get empty(): SolidBrush {
        return new SolidBrush(new RgbColor(0, 0, 0, 0));
    }

    override addToStyle(context: IFillStyleContext): void {
        context.setFillStyle(this._color.preview);
    }
}