import { Item } from '../../Design';
import { Rectangle, Vector2 } from '../../Math';
import { Selection } from '../../Selection';
import { Transform } from '../../Transform';
import { Viewport } from '../../Viewport';
import { IRenderingContext } from '../IRenderingContext';
import { RenderingStyleContext } from '../RenderingStyleContext';
import { ISelectionStyle } from './ISelectionStyle';
import { IUiRenderer } from './IUiRenderer';

export class UiRenderer implements IUiRenderer {
    
    private readonly _selectionStyle: ISelectionStyle;

    constructor(selectionStyle: ISelectionStyle) {
        this._selectionStyle = selectionStyle;
    }

    render(context: IRenderingContext, selection: Selection, viewport: Viewport): void {
        this._applySelectionStyle(context, this._selectionStyle);
        for (const item of selection.items) {
            context.save();
            context.setTransform(new Transform(viewport.transform.shift, new Vector2(1, 1), viewport.transform.angle));
            this._renderItemSelection(context, item, viewport.zoom);
            context.restore();
        }
    }

    private _applySelectionStyle(context: IRenderingContext, selectionStyle: ISelectionStyle): void {
        new RenderingStyleContext(context).setStrokeStyle(selectionStyle.stroke);
    }

    private _renderItemSelection(context: IRenderingContext, item: Item, zoom: number): void {
        this._applyItemSelectionTransform(context, item, zoom);
        this._buildSelectionRectangle(context, this._getSelectionRectangle(item, zoom));
        context.stroke();
    }

    private _applyItemSelectionTransform(context: IRenderingContext, item: Item, zoom: number): void {
        context.transform(Transform.createIdentity().translate(item.position.scale(zoom)));
        context.transform(Transform.createIdentity().rotate(item.transform.angle));
    }

    private _getSelectionRectangle(item: Item, zoom: number): Rectangle {
        const transform = new Transform(item.transform.shift.scale(zoom), item.transform.scaleFactor.scale(zoom), 0);

        return item.controls.path.transform(transform).bounds.rectangle;
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