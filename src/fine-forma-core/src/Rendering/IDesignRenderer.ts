import { Design } from '../Design/Design';
import { IRenderingContext } from './IRenderingContext';

export interface IDesignRenderer {

    render(context: IRenderingContext, design: Design): void;
}