import { Item } from './Items/Item';

export class Layer {

    private readonly _items: readonly Item[];
    private readonly _zIndex: number;

    constructor(items: readonly Item[], zIndex: number) {
        this._items = [...items];
        this._zIndex = zIndex;
    }

    get items(): readonly Item[] {
        return this._items;
    }

    get zIndex(): number {
        return this._zIndex;
    }
}