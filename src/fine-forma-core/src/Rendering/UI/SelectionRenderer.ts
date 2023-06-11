import { IRenderer, IRenderingContext, ISelectionStyle, IViewportContext } from '..';
import { Item } from '../../Design';
import { ISelectionContext } from '../../ISelectionContext';
import { Vector2, Rectangle } from '../../Math';
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
        this._applySelectionStyle(context, this._selectionStyle);
        for (const item of this._selectionContext.selection.items) {
            context.save();
            context.setTransform(new Transform(
                this._viewportContext.viewport.transform.shift, 
                new Vector2(1, 1), 
                this._viewportContext.viewport.transform.angle
            ));
            this._applyItemSelectionTransform(context, item, this._viewportContext.viewport.zoom);
            this._renderItemSelection(context, item, this._viewportContext.viewport.zoom);
            context.restore();
        }
    }

    private _applySelectionStyle(context: IRenderingContext, selectionStyle: ISelectionStyle): void {
        new RenderingStyleContext(context).setStrokeStyle(selectionStyle.stroke);
    }

    private _renderItemSelection(context: IRenderingContext, item: Item, zoom: number): void {
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