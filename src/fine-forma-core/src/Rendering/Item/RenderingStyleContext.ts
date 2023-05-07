import { IStyleContext } from '../../Design';
import { Pen, Brush, IFillStyleContext, IColorPreview } from '../../Style';
import { IRenderingContext } from '../IRenderingContext';

export class RenderingStyleContext implements IStyleContext {
    
    private readonly _context: IRenderingContext;

    constructor(context: IRenderingContext) {
        this._context = context;
    }

    setStrokeStyle(stroke: Pen): void {
        stroke.style.addToStyle(
            new StrokeStyleAdapter(this._context));
        this._context.setLineWidth(stroke.width);
        this._context.setLineDash(Array.from(stroke.dash.dashes), stroke.dash.dashOffset);
    }
    
    setFillStyle(fill: Brush): void {
        fill.addToStyle(this._context);
    }
}

class StrokeStyleAdapter implements IFillStyleContext {
    
    private readonly _context: IRenderingContext;

    constructor(context: IRenderingContext) {
        this._context = context;
    }

    setFillStyle(color: IColorPreview): void {
        this._context.setStrokeStyle(color);
    }
}