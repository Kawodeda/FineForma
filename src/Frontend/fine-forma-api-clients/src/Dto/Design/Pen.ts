import { Brush } from './Brush'
import { DashSettings } from './DashSettings';

export type Pen = {

    style?: Brush;

    width?: number;

    dash?: DashSettings;
}