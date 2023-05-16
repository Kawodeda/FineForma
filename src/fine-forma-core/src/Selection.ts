import { Item } from './Design';
import { Bounds } from './Math';
import { ReadonlyCollection } from './ReadonlyCollection';

export class Selection {

    private readonly _items: ReadonlyCollection<Item>;

    constructor(selected: Item | readonly Item[] | ReadonlyCollection<Item> = []) {
        if (selected instanceof Item) {
            this._items = new ReadonlyCollection([selected]);
        }
        else if (selected instanceof ReadonlyCollection) {
            this._items = selected;
        }
        else {
            this._items = new ReadonlyCollection(selected);
        }
    }

    static get empty(): Selection {
        return new Selection();
    }

    get items(): readonly Item[] {
        return this._items.elements;
    }

    get isEmpty(): boolean {
        return this._items.length === 0;
    }

    get isSingle(): boolean {
        return this._items.length === 1;
    }

    get single(): Item {
        if (!this.isSingle) {
            throw new Error('Selection does not contain single item');
        }

        return this._items.get(0);
    }

    get bounds(): Bounds {
        return Bounds.from(this.items.flatMap(
            item => [item.controls.path.bounds.corner1, item.controls.path.bounds.corner2]
        ));
    }

    add(selection: Item | readonly Item[]): Selection {
        const toAdd: Item[] = [];
        if (selection instanceof Item) {
            toAdd.push(selection);
        }
        else {
            toAdd.push(...selection);
        }

        return new Selection(this._items.addRange(toAdd));
    }

    remove(selection: Item | readonly Item[]): Selection {
        const toRemove: Item[] = [];
        if (selection instanceof Item) {
            toRemove.push(selection);
        }
        else {
            toRemove.push(...selection);
        }

        return new Selection(this._items.removeRange(toRemove));
    }
}