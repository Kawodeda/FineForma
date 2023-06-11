import { Design, Item, Layer } from '../../../Design';
import { Vector2 } from '../../../Math';
import { ItemCommand } from './ItemCommand';

export class RotateItemCommand extends ItemCommand {
    
    private readonly _angle: number;
    private readonly _center: Vector2;

    constructor(item: Item, angle: number, center: Vector2 = Vector2.zero) {
        super(item);

        this._angle = angle;
        this._center = center;
    }

    override execute(design: Design): Promise<Design> {
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(
            layer.items.update(
                this._item, 
                this._item.setTransform(this._item.transform.rotateAt(this._angle, this._center.negate()))),
            layer.zIndex
        );
        
        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }
}