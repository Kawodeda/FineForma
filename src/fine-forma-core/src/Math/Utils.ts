const DEGREE_PER_RADIAN = 180;
const EPSILON = 0.000001;

export function nearlyEquals(a: number, b: number, epsilon = EPSILON): boolean {
    const difference = Math.abs(a - b);

    return difference < epsilon;
}

export function nearlyInRange(value: number, min: number, max: number): boolean {
    return (value > min || nearlyEquals(value, min)) 
        && (value < max || nearlyEquals(value, max));
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

export function angleToPositive(signedAngle: number): number {
    return signedAngle < 0
        ? Math.PI * 2 + signedAngle
        : signedAngle;
}

export function quadraticEquation(a: number, b: number, c: number): number[] {
    const discriminant = Math.sqrt(b ** 2 - 4 * a * c);
    if (discriminant < 0) {
        return [];
    }
    if (nearlyEquals(discriminant, 0)) {
        return [-b / (2 * a)];
    }
    
    return [
        (-b - discriminant) / (2 * a),
        (-b + discriminant) / (2 * a)
    ];
}