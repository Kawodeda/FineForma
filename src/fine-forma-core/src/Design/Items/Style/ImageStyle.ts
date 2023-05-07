import { Brush, Pen, SolidBrush } from '../../../Style';
import { IItemStyle, IStyleContext } from '../Interfaces';
import { ClosedShapeStyle } from './ClosedShapeStyle';

export class ImageStyle implements IItemStyle {

    private readonly _closedShapeStyle: ClosedShapeStyle;

    constructor(border: Pen = Pen.empty, fill: Brush = SolidBrush.empty) {
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
}