import { Design } from '../Design';
import { Viewport } from '../Viewport';
import { Selection } from '../Selection';
import { IRenderingContext } from './IRenderingContext';

export interface IRenderer {

    render(context: IRenderingContext): void;
}

export interface IViewportContext {

    get viewport(): Viewport;
}

export interface IDesignContext {

    get design(): Design;
}

export interface ISelectionContext {

    get selection(): Selection;
}