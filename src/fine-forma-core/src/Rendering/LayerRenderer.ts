import { Layer } from '../Design';
import { ILayerRenderer } from './ILayerRenderer';
import { IRenderingContext } from './IRenderingContext';
import { IItemRendererFactory } from './Item';

export class LayerRenderer implements ILayerRenderer {

    private readonly _itemRendererFactory: IItemRendererFactory;

    constructor(itemRendererFactory: IItemRendererFactory) {
        this._itemRendererFactory = itemRendererFactory;
    }

    render(context: IRenderingContext, layer: Layer): void {
        for (const item of layer.items) {
            this._itemRendererFactory
                .createFor(item)
                .render(context);
        }
    }
}