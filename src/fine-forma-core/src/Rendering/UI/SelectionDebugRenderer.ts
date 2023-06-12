import { IRenderer, IRenderingContext, IViewportContext } from '..';
import { ISelectionContext } from '../../ISelectionContext';
import { Vector2, Rectangle } from '../../Math';
import { red, blue } from '../../Style';

export class SelectionDebugRenderer implements IRenderer {
    
    private readonly _selectionContext: ISelectionContext;
    private readonly _viewportContext: IViewportContext;

    constructor(selectionContext: ISelectionContext, viewportContext: IViewportContext) {
        this._selectionContext = selectionContext;
        this._viewportContext = viewportContext;
    }

    render(context: IRenderingContext): void {
        for (const item of this._selectionContext.selection.items) {
            const bounds = item.controls.path.bounds.rectangle;
            context.setFillStyle(red());
            context.beginPath();
            context.ellipse(item.position, new Vector2(10 / this._viewportContext.viewport.zoom, 10 / this._viewportContext.viewport.zoom), 0, 2 * Math.PI, 0, false);
            context.closePath();
            context.fill();
            context.setFillStyle(blue());
            context.beginPath();
            context.ellipse(bounds.center.add(item.position), new Vector2(10 / this._viewportContext.viewport.zoom, 10 / this._viewportContext.viewport.zoom), 0, 2 * Math.PI, 0, false);
            context.closePath();
            context.fill();
            this._drawRectangle(context, new Rectangle(bounds.corner1.add(item.position), bounds.corner2.add(item.position)));
            context.stroke();
        }
    }

    private _drawRectangle(context: IRenderingContext, rectangle: Rectangle): void {
        context.beginPath();
        context.moveTo(rectangle.corner1);
        context.lineTo(rectangle.corner1.add(new Vector2(rectangle.width, 0)));
        context.lineTo(rectangle.corner2);
        context.lineTo(rectangle.corner2.subtract(new Vector2(rectangle.width, 0)));
        context.closePath();
    }
}