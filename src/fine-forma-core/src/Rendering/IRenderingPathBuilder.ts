import { Vector2 } from '../Math';

export interface IRenderingPathBuilder {

    beginPath(): void;

    closePath(): void;

    moveTo(position: Vector2): void;

    lineTo(end: Vector2): void;

    quadraticCurveTo(control: Vector2, end: Vector2): void;

    cubicCurveTo(control1: Vector2, control2: Vector2, end: Vector2): void;

    ellipse(center: Vector2, radius: Vector2, startAngle: number, endAngle: number, xAxisRotation: number): void;
}