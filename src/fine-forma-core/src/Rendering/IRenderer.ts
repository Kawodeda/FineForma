import { Viewport } from '../Viewport';
import { Selection } from '../Selection';
import { IRenderingContext } from './IRenderingContext';

export interface IRenderer {

    render(context: IRenderingContext): void;
}

export interface IViewportContext {

    get viewport(): Viewport;
}

export interface ISelectionContext {

    get selection(): Selection;
}