import { Selection } from '../../Selection';
import { IRenderingContext } from '../IRenderingContext';

export interface IUiRenderer {

    render(context: IRenderingContext, selection: Selection): void;
}