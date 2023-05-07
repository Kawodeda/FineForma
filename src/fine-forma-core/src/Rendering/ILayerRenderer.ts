import { Layer } from '../Design/Layer';
import { IRenderingContext } from './IRenderingContext';

export interface ILayerRenderer {

    render(context: IRenderingContext, layer: Layer): void;
}