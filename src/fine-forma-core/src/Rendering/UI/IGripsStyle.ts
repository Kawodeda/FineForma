import { Brush, Pen } from '../../Style';

export interface IGripsStyle {

    get stroke(): Pen;

    get fill(): Brush;
}