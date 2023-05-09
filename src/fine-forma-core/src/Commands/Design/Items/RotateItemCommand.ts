import { Design, Item, Layer } from '../../../Design';
import { ItemCommand } from './ItemCommand';

export class RotateItemCommand extends ItemCommand {
    
    private readonly _angle: number;

    constructor(item: Item, angle: number) {
        super(item);

        this._angle = angle;
    }

    override execute(design: Design): Promise<Design> {
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(
            layer.items.update(
                this._item, 
                this._item.setTransform(this._item.transform.rotate(this._angle))),
            layer.zIndex
        );
        
        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }
}