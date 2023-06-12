import { Design, Item, Layer } from '../../../Design';
import { Vector2 } from '../../../Math';
import { ItemCommand } from './ItemCommand';

export class MoveItemCommand extends ItemCommand {
    
    private readonly _shift: Vector2;

    constructor(item: Item, shift: Vector2) {
        super(item);

        this._shift = shift;
    }

    override execute(design: Design): Promise<Design> {
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(
            layer.items.update(
                this._item, 
                this._item.setPosition(this._item.position.add(this._shift))),
            layer.zIndex
        );
        
        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }
}