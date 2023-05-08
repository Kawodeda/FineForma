import { Brush, Brushes, Pen } from '../../../Style';
import { IItemStyle, IStyleContext } from '../Interfaces';
import { ClosedShapeStyle } from './ClosedShapeStyle';

export class ImageStyle implements IItemStyle {

    private readonly _closedShapeStyle: ClosedShapeStyle;

    constructor(border: Pen = Pen.empty, fill: Brush = Brushes.transparent()) {
        this._closedShapeStyle = new ClosedShapeStyle(border, fill);
    }

    get border(): Pen {
        return this._closedShapeStyle.stroke;
    }

    get fill(): Brush {
        return this._closedShapeStyle.fill;
    }

    applyTo(context: IStyleContext): void {
        this._closedShapeStyle.applyTo(context);
    }

    equals(other: ImageStyle): boolean {
        return this.border.equals(other.border)
            && this.fill.equals(other.fill);
    }
}