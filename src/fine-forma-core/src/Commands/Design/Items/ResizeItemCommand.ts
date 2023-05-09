import { Design, Item } from '../../../Design';
import { Vector2 } from '../../../Math';
import { ItemCommand } from './ItemCommand';

export class ResizeItemCommand extends ItemCommand {
    
    constructor(item: Item, size: Vector2) {
        super(item);
    }

    override execute(design: Design): Promise<Design> {
        throw new Error('Method not implemented.');
    }
}