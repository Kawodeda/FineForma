import { nearlyEquals } from '../Math';
import { ReadonlyCollection } from '../ReadonlyCollection';
import { Item } from './Items/Item';

export class Layer {

    private readonly _items: ReadonlyCollection<Item>;
    private readonly _zIndex: number;

    constructor(items: readonly Item[] | ReadonlyCollection<Item>, zIndex: number) {
        if (items instanceof ReadonlyCollection<Item>) {
            this._items = items;
        }
        else {
            this._items = new ReadonlyCollection<Item>(items);
        }
        
        this._zIndex = zIndex;
    }

    get items(): ReadonlyCollection<Item> {
        return this._items;
    }

    get zIndex(): number {
        return this._zIndex;
    }

    equals(other: Layer): boolean {
        return this.items.equals(other.items, (a, b) => a.equals(b))
            && nearlyEquals(this.zIndex, other.zIndex);
    }
}