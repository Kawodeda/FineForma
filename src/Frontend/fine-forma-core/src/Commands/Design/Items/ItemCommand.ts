import { Design, Item } from '../../../Design';
import { IDesignCommand } from '../../Interfaces';

export abstract class ItemCommand implements IDesignCommand {
    
    protected readonly _item: Item;

    constructor(item: Item) {
        this._item = item;
    }

    abstract execute(design: Design): Promise<Design>;
}