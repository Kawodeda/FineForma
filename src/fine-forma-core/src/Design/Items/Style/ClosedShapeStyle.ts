import { Brush } from '../../../Style/Brush';
import { Pen } from '../../../Style/Pen';
import { IItemStyle } from '../Interfaces/IItemStyle';
import { IStyleContext } from '../Interfaces/IStyleContext';

export class ClosedShapeStyle implements IItemStyle {

    private readonly _stroke: Pen;
    private readonly _fill: Brush;

    constructor(stroke: Pen, fill: Brush) {
        this._stroke = stroke;
        this._fill = fill;
    }

    get stroke(): Pen {
        return this._stroke;
    }

    get fill(): Brush {
        return this._fill;
    }

    applyTo(context: IStyleContext): void {
        context.setStrokeStyle(this.stroke);
        context.setFillStyle(this.fill);
    }

    setStroke(stroke: Pen): ClosedShapeStyle {
        return new ClosedShapeStyle(stroke, this.fill);
    }

    setFill(fill: Brush): ClosedShapeStyle {
        return new ClosedShapeStyle(this.stroke, fill);
    }

    equals(other: ClosedShapeStyle): boolean {
        return this.stroke.equals(other.stroke)
            && this.fill.equals(other.fill);
    }
}