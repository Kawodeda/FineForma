import { Design, Item, Layer } from '../../../Design';
import { Pen } from '../../../Style';
import { ItemCommand } from './ItemCommand';

export class SetStrokeStyleCommand extends ItemCommand {
    
    protected override readonly _item: IItemWithStroke
    private readonly _stroke: Pen;

    constructor(item: IItemWithStroke, stroke: Pen) {
        super(item)

        this._item = item;
        this._stroke = stroke;
    }

    override execute(design: Design): Promise<Design> {
        const newItem = this._item.setStrokeStyle(this._stroke);
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(layer.items.update(this._item, newItem), layer.zIndex);

        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }
}

export interface IItemWithStroke extends Item {

    get strokeStyle(): Pen;

    setStrokeStyle(stroke: Pen): IItemWithStroke;
}

export function isItemWithStroke(item: Item): item is IItemWithStroke {
    return 'setStrokeStyle' in item 
        && typeof item.setStrokeStyle === 'function'
        && 'strokeStyle' in item
        && item.strokeStyle instanceof Pen;
}