import { Brush } from './Brush';
import { Color } from './Color/Color';
import { IFillStyleContext } from './IFillStyleContext';

export class SolidBrush extends Brush {

    private readonly _color: Color;

    constructor(color: Color) {
        super();

        this._color = color;
    }

    get color(): Color {
        return this._color;
    }

    override addToStyle(context: IFillStyleContext): void {
        context.setFillStyle(this._color.preview);
    }

    override equals(other: SolidBrush): boolean {
        return this.color.equals(other.color);
    }
}