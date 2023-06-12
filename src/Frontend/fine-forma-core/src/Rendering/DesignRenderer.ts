import { Design } from '../Design/Design';
import { IDesignRenderer } from './IDesignRenderer';
import { ILayerRenderer } from './ILayerRenderer';
import { IRenderingContext } from './IRenderingContext';

export class DesignRenderer implements IDesignRenderer {

    private readonly _layerRenderer: ILayerRenderer;

    constructor(layerRenderer: ILayerRenderer) {
        this._layerRenderer = layerRenderer;
    }

    render(context: IRenderingContext, design: Design): void {
        for (const layer of design.layers) {
            this._layerRenderer.render(context, layer);
        }
    }
}