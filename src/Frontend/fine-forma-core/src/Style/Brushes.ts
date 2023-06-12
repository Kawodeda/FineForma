import { Brush } from './Brush';
import { SolidBrush } from './SolidBrush';
import * as RgbColors from './Color/RgbColors';

export function transparent(): Brush {
    return new SolidBrush(RgbColors.transparent());
}

export function white(): Brush {
    return new SolidBrush(RgbColors.white());
}

export function black(): Brush {
    return new SolidBrush(RgbColors.black());
}

export function red(): Brush {
    return new SolidBrush(RgbColors.red());
}

export function green(): Brush {
    return new SolidBrush(RgbColors.green());
}

export function blue(): Brush {
    return new SolidBrush(RgbColors.blue());
}

export function cyan(): Brush {
    return new SolidBrush(RgbColors.cyan());
}

export function magenta(): Brush {
    return new SolidBrush(RgbColors.magenta());
}

export function yellow(): Brush {
    return new SolidBrush(RgbColors.yellow());
}

export function lavender(): Brush {
    return new SolidBrush(RgbColors.lavender());
}