import { Layer } from './Layer';

export class Design {

    private readonly _layers: readonly Layer[];

    constructor(layers: readonly Layer[]) {
        this._layers = this._orderByZIindex(layers);
    }

    get layers(): readonly Layer[] {
        return this._layers;
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    private _orderByZIindex(layers: readonly Layer[]): readonly Layer[] {
        return [...layers].sort(
            (a, b) => a.zIndex - b.zIndex
        );
    }
}