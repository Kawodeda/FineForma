import { IRenderer, IRenderingContext, IViewportContext } from '..';
import { ISelectionContext } from '../../ISelectionContext';
import { Rectangle } from '../../Math';
import { RgbColor, white } from '../../Style';
import { Transform } from '../../Transform';
import { IRotationGrip } from '../../Ui';

interface IRotationGripContext {

    get rotationGrip(): IRotationGrip;
}

export class RotationGripRenderer implements IRenderer {
    
    private readonly _selectionContext: ISelectionContext;
    private readonly _viewportContext: IViewportContext;
    private readonly _rotationGripContext: IRotationGripContext;

    constructor(selectionContext: ISelectionContext, viewportContext: IViewportContext, rotationGripContext: IRotationGripContext) {
        this._selectionContext = selectionContext;
        this._viewportContext = viewportContext;
        this._rotationGripContext = rotationGripContext;
    }

    private get _rotationGripRectangle(): Rectangle {
        return this._rotationGripContext.rotationGrip.getRectangle(
            this._selectionContext.selection.single.controls.path.bounds.rectangle, 
            this._viewportContext.viewport.zoom
        );
    }

    render(context: IRenderingContext): void {
        if (this._selectionContext.selection.isEmpty) {
            return;
        }
        if (!this._selectionContext.selection.isSingle) {
            console.warn('Rotation grip for multi-selection is not supported');

            return;
        }

        context.save();
        this._applySelectionTransform(context);
        this._applyRotationGripStyle(context);
        this._renderRotationGrip(context);
        context.restore();
    }

    private _applySelectionTransform(context: IRenderingContext): void {
        context.transform(Transform.createIdentity().translate(this._selectionContext.selection.single.position));
        context.transform(this._selectionContext.selection.single.transform);
    }

    private _applyRotationGripStyle(context: IRenderingContext): void {
        context.setStrokeStyle(new RgbColor(0, 144, 255, 255));
        context.setLineWidth(2 / this._viewportContext.viewport.zoom);
        context.setFillStyle(white());
    }

    private _renderRotationGrip(context: IRenderingContext): void {
        context.beginPath();
        context.ellipse(
            this._rotationGripRectangle.center,
            this._rotationGripRectangle.size.scale(1 / 2),
            0,
            Math.PI * 2,
            0,
            false);
        context.closePath();
        context.fill();
        context.stroke();
    }
}