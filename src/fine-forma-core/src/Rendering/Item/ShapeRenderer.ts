import { Item } from '../../Design';
import { Transform } from '../../Transform';
import { IRenderingContext } from '../IRenderingContext';
import { IItemRenderer } from './IItemRenderer';
import { RenderingPathBuilder } from './Path/RenderingPathBuilder';
import { RenderingStyleContext } from './RenderingStyleContext';

export class ShapeRenderer implements IItemRenderer {
    
    private readonly _item: Item;
    private readonly _next: IItemRenderer | undefined;

    constructor(item: Item, next?: IItemRenderer) {
        this._item = item;
        this._next = next;
    }

    get next(): IItemRenderer | undefined {
        return this._next;
    }

    render(context: IRenderingContext): void {
        context.save();

        this._item.style.applyTo(new RenderingStyleContext(context));

        context.transform(Transform
            .createIdentity()
            .translate(this._item.position));
        context.transform(this._item.transform);

        this._item.controls.path.build(new RenderingPathBuilder(context));
        context.fill();
        context.stroke();

        context.restore();

        this.next?.render(context);
    }
}