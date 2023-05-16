import { Item } from '../../Design';
import { Rectangle, Vector2 } from '../../Math';
import { Selection } from '../../Selection';
import { Transform } from '../../Transform';
import { IRenderingContext } from '../IRenderingContext';
import { RenderingStyleContext } from '../RenderingStyleContext';
import { ISelectionStyle } from './ISelectionStyle';
import { IUiRenderer } from './IUiRenderer';

export class UiRenderer implements IUiRenderer {
    
    private readonly _selectionStyle: ISelectionStyle;

    constructor(selectionStyle: ISelectionStyle) {
        this._selectionStyle = selectionStyle;
    }

    render(context: IRenderingContext, selection: Selection): void {
        this._applySelectionStyle(context, this._selectionStyle);
        for (const item of selection.items) {
            context.save();
            this._renderItemSelection(context, item);
            context.restore();
        }
    }

    private _renderItemSelection(context: IRenderingContext, item: Item): void {
        this._applyItemSelectionTransform(context, item);
        this._buildSelectionRectangle(context, item.controls.path.bounds.rectangle);
        context.stroke();
    }

    private _applySelectionStyle(context: IRenderingContext, selectionStyle: ISelectionStyle): void {
        new RenderingStyleContext(context).setStrokeStyle(selectionStyle.stroke);
    }

    private _applyItemSelectionTransform(context: IRenderingContext, item: Item): void {
        context.transform(Transform.createIdentity().translate(item.position));
        context.transform(item.transform);
    }

    private _buildSelectionRectangle(context: IRenderingContext, rectangle: Rectangle): void {
        context.beginPath();
        context.moveTo(rectangle.corner1);
        context.lineTo(rectangle.corner1.add(new Vector2(rectangle.width, 0)));
        context.lineTo(rectangle.corner2);
        context.lineTo(rectangle.corner2.subtract(new Vector2(rectangle.width, 0)));
        context.closePath();
    }
}