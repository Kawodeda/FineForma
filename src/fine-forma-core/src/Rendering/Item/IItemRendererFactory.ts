import { Item } from '../../Design';
import { IItemRenderer } from './IItemRenderer';

export interface IItemRendererFactory {

    createFor(item: Item): IItemRenderer;
}