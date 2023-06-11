import { IRenderer, IRenderingContext, ISelectionStyle, IViewportContext } from '..';
import { Item } from '../../Design';
import { ISelectionContext } from '../../ISelectionContext';
import { Vector2, Rectangle } from '../../Math';
import { Pen } from '../../Style';
import { Transform } from '../../Transform';
import { RenderingStyleContext } from '../RenderingStyleContext';

export class SelectionRenderer implements IRenderer {
    
    private readonly _selectionContext: ISelectionContext;
    private readonly _viewportContext: IViewportContext;
    private readonly _selectionStyle: ISelectionStyle;

    constructor(selectionContext: ISelectionContext, viewportContext: IViewportContext, selectionStyle: ISelectionStyle) {
        this._selectionContext = selectionContext;
        this._viewportContext = viewportContext;
        this._selectionStyle = selectionStyle;
    }

    render(context: IRenderingContext): void {
        this._applySelectionStyle(context, this._viewportContext.viewport.zoom);
        for (const item of this._selectionContext.selection.items) {
            context.save();
            this._applyItemSelectionTransform(context, item);
            this._renderItemSelection(context, item);
            context.restore();
        }
    }

    private _applySelectionStyle(context: IRenderingContext, zoom: number): void {
        new RenderingStyleContext(context).setStrokeStyle(new Pen(
            this._selectionStyle.stroke.style,
            this._selectionStyle.stroke.width / zoom,
            this._selectionStyle.stroke.dash
        ));
    }

    private _renderItemSelection(context: IRenderingContext, item: Item): void {
        this._buildSelectionRectangle(context, this._getSelectionRectangle(item));
        context.stroke();
    }

    private _applyItemSelectionTransform(context: IRenderingContext, item: Item): void {
        context.transform(Transform.createIdentity().translate(item.position));
        context.transform(item.transform);
    }

    private _getSelectionRectangle(item: Item): Rectangle {
        return item.controls.path.bounds.rectangle;
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