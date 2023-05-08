import { ReadonlyCollection } from '../ReadonlyCollection';
import { Item } from './Items';
import { Layer } from './Layer';

export class Design {

    private readonly _layers: ReadonlyCollection<Layer>;

    constructor(layers: readonly Layer[] | ReadonlyCollection<Layer>) {
        if (layers instanceof ReadonlyCollection<Layer>) {
            this._layers = layers;
        }
        else {
            this._layers = new ReadonlyCollection<Layer>(this._orderByZIindex(layers));
        }
    }

    get layers(): ReadonlyCollection<Layer> {
        return this._layers;
    }

    contains(item: Item): boolean {
        return this._layers.find(layer => layer.items.includes(item)) != null;
    }

    getLayerOf(item: Item): Layer {
        const result = this._layers.find(layer => layer.items.includes(item));
        if (result == null) {
            throw new Error('Specified item is missing');
        }

        return result;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _orderByZIindex(layers: readonly Layer[]): readonly Layer[] {
        return [...layers].sort(
            (a, b) => a.zIndex - b.zIndex
        );
    }
}