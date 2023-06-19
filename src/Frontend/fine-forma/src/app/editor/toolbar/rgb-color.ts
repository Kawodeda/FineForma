export interface IRgbColor {

    r: number;

    g: number;

    b: number;
}

export function toHex(rgb: IRgbColor): string {
    return `#${componentToHex(rgb.r)}${componentToHex(rgb.g)}${componentToHex(rgb.b)}`;
}

export function fromHex(hex: string): IRgbColor {
    const hexRegex = /^#([0-9a-f]{1,2})([0-9a-f]{1,2})([0-9a-f]{1,2})$/;
    const result = hexRegex.exec(hex);
    if (result == null || result[1] == null || result[2] == null || result[3] == null) {
        throw new Error('Unable to parse hex string');
    }

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return { r: r, g: g, b: b };
}

function componentToHex(value: number): string {
    return value.toString(16).padStart(2, '0');
}