import { Item } from '../../Design';
import { IItemRenderer } from './IItemRenderer';
import { ShapeRenderer } from './ShapeRenderer';

export class ItemRendererFactory {

    createFor(item: Item): IItemRenderer {
        const renderer = new ShapeRenderer(item);

        return renderer;
    }
}