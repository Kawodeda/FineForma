import { Design, Item, Layer } from '../../../Design';
import { ItemCommand } from './ItemCommand';

export class AddItemToLayerCommand extends ItemCommand {
    
    private readonly _layer: Layer;

    constructor(item: Item, layer: Layer) {
        super(item);

        this._layer = layer;
    }

    override execute(design: Design): Promise<Design> {
        return Promise.resolve(
            new Design(design.layers.update(
                this._layer, 
                new Layer(this._layer.items.add(this._item), this._layer.zIndex)
            ))
        );
    }
}