import { Design, Item } from '../../../Design';
import { Vector2 } from '../../../Math';
import { ItemCommand } from './ItemCommand';

export class MoveItemCommand extends ItemCommand {
    
    constructor(item: Item, shift: Vector2) {
        
    }

    override execute(design: Design): Promise<Design> {
        throw new Error('Method not implemented.');
    }
}