import { Pen } from '../../../Style/Pen';
import { IItemStyle } from '../Interfaces/IItemStyle';
import { IStyleContext } from '../Interfaces/IStyleContext';

export class ImageStyle implements IItemStyle {

    private readonly _border: Pen;

    constructor(border: Pen) {
        this._border = border;
    }

    get border(): Pen {
        return this._border;
    }

    applyTo(context: IStyleContext): void {
        context.setStrokeStyle(this.border);
    }
}