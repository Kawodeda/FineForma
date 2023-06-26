import { AddItemToLayerCommand, ItemCommand } from '.';
import { last } from '../../../ArrayUtils';
import { Design } from '../../../Design';

export class AddItemCommand extends ItemCommand {
    
    override execute(design: Design): Promise<Design> {
        const layer = last(design.layers.elements);

        return new AddItemToLayerCommand(this._item, layer).execute(design);
    }
}