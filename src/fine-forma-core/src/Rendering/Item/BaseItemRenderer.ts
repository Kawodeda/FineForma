import { Item } from '../../Design';
import { Transform } from '../../Transform';
import { IRenderingContext } from '../IRenderingContext';
import { IItemRenderer } from './IItemRenderer';
import { RenderingStyleContext } from './RenderingStyleContext';

export abstract class BaseItemRenderer implements IItemRenderer {
    
    protected readonly _item: Item;
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

        this._renderItem(context);
            
        context.restore();

        this.next?.render(context);
    }

    protected abstract _renderItem(context: IRenderingContext): void;
}