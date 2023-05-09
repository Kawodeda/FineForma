import { Design, Item } from '../../../Design';
import { AddItemToLayerCommand } from './AddItemToLayerCommand';
import { ItemCommand } from './ItemCommand';

export class AddItemToLayerAtCommand extends ItemCommand {
    
    private readonly _layerIndex: number;

    constructor(item: Item, layerIndex: number) {
        super(item);

        this._layerIndex = layerIndex;
    }

    override execute(design: Design): Promise<Design> {
        return new AddItemToLayerCommand(this._item, design.layers.get(this._layerIndex))
            .execute(design);
    }
}