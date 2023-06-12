import { Design, Item, Layer } from '../../../Design';
import { Brush } from '../../../Style';
import { ItemCommand } from './ItemCommand';

export class SetFillStyleCommand extends ItemCommand {
    
    protected override readonly _item: IItemWithFill;
    private readonly _fill: Brush;

    constructor(item: IItemWithFill, fill: Brush) {
        super(item);

        this._item = item;
        this._fill = fill;
    }

    override execute(design: Design): Promise<Design> {
        const newItem = this._item.setFillStyle(this._fill);
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(layer.items.update(this._item, newItem), layer.zIndex);

        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }
}

export interface IItemWithFill extends Item {

    setFillStyle(fill: Brush): IItemWithFill;
}