import { IRenderingContext } from '../IRenderingContext';

export interface IItemRenderer {

    get next(): IItemRenderer | undefined;

    render(context: IRenderingContext): void;
}