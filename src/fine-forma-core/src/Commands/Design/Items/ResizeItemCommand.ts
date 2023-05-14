import { Design, Item } from '../../../Design';
import { Rectangle } from '../../../Math';
import { ItemCommand } from './ItemCommand';

export class ResizeItemCommand extends ItemCommand {
    
    private readonly _rectangle: Rectangle;

    constructor(item: Item, rectangle: Rectangle) {
        super(item);

        this._rectangle = rectangle;
    }

    override execute(design: Design): Promise<Design> {
        return Promise.resolve(
            design
        );
    }
}