import { Brush } from './Brush';
import { RgbColor } from './Color';
import { SolidBrush } from './SolidBrush';

export function transparent(): Brush {
    return new SolidBrush(new RgbColor(0, 0, 0, 0));
}