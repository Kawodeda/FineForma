import { Viewport } from '../Viewport';
import { IRenderingContext } from './IRenderingContext';

export interface IRenderer {

    render(context: IRenderingContext): void;
}

export interface IViewportContext {

    get viewport(): Viewport;
}