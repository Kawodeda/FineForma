import { Design, Item } from '../../Design';
import { Selection } from '../../Selection';
import { ISelectionCommand } from '../Interfaces';

export class SelectItemCommand implements ISelectionCommand {
    
    private readonly _item: Item;

    constructor(item: Item) {
        this._item = item;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    execute(selection: Selection, design: Design): Promise<Selection> {
        return Promise.resolve(
            new Selection(this._item)
        );
    }
}