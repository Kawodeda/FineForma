import { Selection } from '../../Selection';
import { Viewport } from '../../Viewport';
import { IRenderingContext } from '../IRenderingContext';

export interface IUiRenderer {

    render(context: IRenderingContext, selection: Selection, viewport: Viewport): void;
}