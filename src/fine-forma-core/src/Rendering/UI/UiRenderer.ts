import { Selection } from '../../Selection';
import { IRenderingContext } from '../IRenderingContext';
import { IUiRenderer } from './IUiRenderer';

export class UiRenderer implements IUiRenderer {
    
    render(context: IRenderingContext, selection: Selection): void {
        throw new Error('Method not implemented.');
    }
}