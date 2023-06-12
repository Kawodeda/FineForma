import { IRenderer, IRenderingContext, IViewportContext } from '..';
import { ISelectionContext } from '../../ISelectionContext';
import { Rectangle, Vector2 } from '../../Math';
import { Pen } from '../../Style';
import { Transform } from '../../Transform';
import { RenderingStyleContext } from '../RenderingStyleContext';
import { IGripsStyle } from './IGripsStyle';

interface IResizeGripsContext {

    get gripSize(): number;
}

export class ResizeGripsRenderer implements IRenderer {
    
    private readonly _selectionContext: ISelectionContext;
    private readonly _viewportContext: IViewportContext;
    private readonly _resizeGripsContext: IResizeGripsContext;
    private readonly _gripsStyle: IGripsStyle;

    constructor(
        selectionContext: ISelectionContext, 
        viewportContext: IViewportContext, 
        resizeGripsContext: IResizeGripsContext, 
        gripsStyle: IGripsStyle
    ) {
        this._selectionContext = selectionContext;
        this._viewportContext = viewportContext;
        this._resizeGripsContext = resizeGripsContext;
        this._gripsStyle = gripsStyle;
    }

    private get _resizeGrips(): Rectangle[] {
        const selectionRectangle = this._selectionContext.selection.single.controls.path.bounds.rectangle;

        return [
            Rectangle.from(selectionRectangle.corner1, this._resizeGripSize, this._resizeGripSize),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(selectionRectangle.width / 2, 0)),
                this._resizeGripSize,
                this._resizeGripSize
            ),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(selectionRectangle.width, 0)),
                this._resizeGripSize,
                this._resizeGripSize
            ),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(selectionRectangle.width, selectionRectangle.height / 2)),
                this._resizeGripSize,
                this._resizeGripSize
            ),
            Rectangle.from(selectionRectangle.corner2, this._resizeGripSize, this._resizeGripSize),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(selectionRectangle.width / 2, selectionRectangle.height)),
                this._resizeGripSize,
                this._resizeGripSize
            ),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(0, selectionRectangle.height)),
                this._resizeGripSize,
                this._resizeGripSize
            ),
            Rectangle.from(
                selectionRectangle.corner1.add(new Vector2(0, selectionRectangle.height / 2)),
                this._resizeGripSize,
                this._resizeGripSize
            )
        ];
    }

    private get _resizeGripSize(): number {
        return this._resizeGripsContext.gripSize / this._viewportContext.viewport.zoom;
    }

    render(context: IRenderingContext): void {
        if (this._selectionContext.selection.isEmpty) {
            return;
        }
        if (!this._selectionContext.selection.isSingle) {
            console.warn('Resize grips for multi-selection is not supported');

            return;
        }

        context.save();
        this._applySelectionTransform(context);
        this._applyResizeGripsStyle(context);
        this._renderResizeGrips(context);
        context.restore();
    }

    private _applySelectionTransform(context: IRenderingContext): void {
        context.transform(Transform.createIdentity().translate(this._selectionContext.selection.single.position));
        context.transform(this._selectionContext.selection.single.transform);
    }

    private _applyResizeGripsStyle(context: IRenderingContext): void {
        const styleContext = new RenderingStyleContext(context);
        styleContext.setStrokeStyle(new Pen(
            this._gripsStyle.stroke.style,
            this._gripsStyle.stroke.width / this._viewportContext.viewport.zoom,
            this._gripsStyle.stroke.dash
        ));
        styleContext.setFillStyle(this._gripsStyle.fill);
    }

    private _renderResizeGrips(context: IRenderingContext): void {
        this._resizeGrips.forEach(grip => this._renderResizeGrip(context, grip));
    }

    private _renderResizeGrip(context: IRenderingContext, grip: Rectangle): void {
        context.beginPath();
        context.moveTo(grip.corner1);
        context.lineTo(grip.corner1.add(new Vector2(grip.width, 0)));
        context.lineTo(grip.corner2);
        context.lineTo(grip.corner1.add(new Vector2(0, grip.height)));
        context.closePath();
        context.fill();
        context.stroke();
    }
}