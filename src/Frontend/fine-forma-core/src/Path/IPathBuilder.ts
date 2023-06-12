import { Vector2 } from '../Math';

export interface IPathBuilder {

    beginPath(): void;

    closePath(): void;

    moveTo(position: Vector2): void;

    lineTo(end: Vector2): void;

    quadraticCurveTo(control: Vector2, end: Vector2): void;

    cubicCurveTo(control1: Vector2, control2: Vector2, end: Vector2): void;

    arcTo(xRadius: number, yRadius: number, xAxisRotation: number, end: Vector2): void;
}