import { Design } from '../../Design';
import { Selection } from '../../Selection';
import { ISelectionCommand } from '../Interfaces';

export class SelectItemAtCommand implements ISelectionCommand {
    
    private readonly _layerIndex: number;
    private readonly _itemIndex: number;

    constructor(layerIndex: number, itemIndex: number) {
        this._layerIndex = layerIndex;
        this._itemIndex = itemIndex;
    }

    execute(selection: Selection, design: Design): Promise<Selection> {
        return Promise.resolve(
            new Selection(design.layers.get(this._layerIndex).items.get(this._itemIndex))
        );
    }
}