import { Pen } from '../../../Style/Pen';
import { IItemStyle } from '../Interfaces/IItemStyle';
import { IStyleContext } from '../Interfaces/IStyleContext';

export class OpenShapeStyle implements IItemStyle {

    private readonly _stroke: Pen;

    constructor(stroke: Pen) {
        this._stroke = stroke;
    }

    get stroke(): Pen {
        return this._stroke;
    }

    applyTo(context: IStyleContext): void {
        context.setStrokeStyle(this.stroke);
    }
}