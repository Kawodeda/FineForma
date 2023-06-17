import { Brush } from './Brush';
import { Pen } from './Pen'

export type ShapeStyle = {

    stroke?: Pen;

    fill?: Brush;

    border?: Pen;
}