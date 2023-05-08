import { RgbColor } from './RgbColor';

export function transparent(): RgbColor {
    return new RgbColor(0, 0, 0, 0);
}

export function white(): RgbColor {
    return new RgbColor(255, 255, 255, 255);
}

export function black(): RgbColor {
    return new RgbColor(0, 0, 0, 255);
}

export function red(): RgbColor {
    return new RgbColor(255, 0, 0, 255);
}

export function green(): RgbColor {
    return new RgbColor(0, 255, 0, 255);
}

export function blue(): RgbColor {
    return new RgbColor(0, 0, 255, 255);
}

export function cyan(): RgbColor {
    return new RgbColor(0, 255, 255, 255);
}

export function magenta(): RgbColor {
    return new RgbColor(255, 0, 255, 255);
}

export function yellow(): RgbColor {
    return new RgbColor(255, 255, 0, 255);
}

export function lavender(): RgbColor {
    return new RgbColor(233, 203, 255, 255);
}