import { Layer } from './Layer';

export class Design {

    private readonly _layers: readonly Layer[];

    constructor(layers: readonly Layer[]) {
        this._layers = layers;
    }

    get layers(): readonly Layer[] {
        return this._layers;
    }
}