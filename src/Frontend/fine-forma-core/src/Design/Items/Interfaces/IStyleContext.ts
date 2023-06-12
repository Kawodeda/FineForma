import { Brush } from '../../../Style/Brush';
import { Pen } from '../../../Style/Pen';

export interface IStyleContext {

    setStrokeStyle(stroke: Pen): void;

    setFillStyle(fill: Brush): void;
}