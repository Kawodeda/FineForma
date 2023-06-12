import { IRenderingContext } from '../IRenderingContext';
import { BaseItemRenderer } from './BaseItemRenderer';
import { RenderingPathBuilder } from './Path/RenderingPathBuilder';

export class ShapeRenderer extends BaseItemRenderer {
    
    protected override _renderItem(context: IRenderingContext): void {
        this._item.controls.path.build(new RenderingPathBuilder(context));
        context.fill();
        context.stroke();
    }
}