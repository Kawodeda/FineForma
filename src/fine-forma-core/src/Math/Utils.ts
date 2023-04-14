export function nearlyEquals(a: number, b: number, epsilon: number = 0.000001): boolean {
    const difference = Math.abs(a - b);

    return difference < epsilon;
}

export function isRealNumber(number: number): boolean {
    return Number.isFinite(number);
}

export function degreeToRadians(angle: number): number {
    return Math.PI * angle / 180;
}