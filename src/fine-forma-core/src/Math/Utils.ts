const DEGREE_PER_RADIAN = 180;
const EPSILON = 0.000001;

export function nearlyEquals(a: number, b: number, epsilon = EPSILON): boolean {
    const difference = Math.abs(a - b);

    return difference < epsilon;
}

export function isRealNumber(number: number): boolean {
    return Number.isFinite(number);
}

export function degreeToRadians(angle: number): number {
    return Math.PI * angle / DEGREE_PER_RADIAN;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.min(max, Math.max(value, min));
}