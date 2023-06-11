import { Vector2 } from '.';

const DEGREE_PER_PI = 180;
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
    return Math.PI * angle / DEGREE_PER_PI;
}

export function radiansToDegree(angle: number): number {
    return DEGREE_PER_PI * angle / Math.PI;
}

export function clamp(value: number, min: number, max: number): number
export function clamp(value: Vector2, min: Vector2, max: Vector2): Vector2
export function clamp(value: number | Vector2, min: number | Vector2, max: number | Vector2): number | Vector2 {
    if (value instanceof Vector2 && min instanceof Vector2 && max instanceof Vector2) {
        return new Vector2(
            Math.min(max.x, Math.max(value.x, min.x)),
            Math.min(max.y, Math.max(value.y, min.y))
        );
    }
    if (typeof(value) === 'number' && typeof(min) === 'number' && typeof(max) === 'number') {
        return Math.min(max, Math.max(value, min));
    }

    throw new Error('Inconsistent parameter types');
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