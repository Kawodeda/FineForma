import { Design, Layer } from '../../Design';
import { IDesignCommand } from '../Interfaces';

export class AddLayerCommand implements IDesignCommand {
    
    private readonly _layer: Layer;

    constructor(layer: Layer) {
        this._layer = layer;
    }

    execute(design: Design): Promise<Design> {
        return Promise.resolve(
            new Design(design.layers.add(this._layer))
        );
    }
}