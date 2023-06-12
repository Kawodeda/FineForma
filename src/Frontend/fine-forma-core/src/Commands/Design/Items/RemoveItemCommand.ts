import { Design, Layer } from '../../../Design';
import { ItemCommand } from './ItemCommand';

export class RemoveItemCommand extends ItemCommand {

    override execute(design: Design): Promise<Design> {
        const layer = design.getLayerOf(this._item);

        return Promise.resolve(
            new Design(design.layers.update(
                layer, 
                new Layer(layer.items.remove(this._item), layer.zIndex)
            ))
        );
    }
}