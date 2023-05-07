import { IRenderingContext } from './IRenderingContext';

export interface IRenderer {

    render(context: IRenderingContext): void;
}