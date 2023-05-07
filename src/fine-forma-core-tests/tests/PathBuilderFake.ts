import { CanvasRenderingContext2D } from 'canvas';

import { IRenderingPathBuilder, Vector2 } from 'fine-forma-core';

export class PathBuilderFake implements IRenderingPathBuilder {

    private readonly _context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
    }

    beginPath(): void {
        this._context.beginPath();
    }

    closePath(): void {
        this._context.closePath();
    }

    moveTo(position: Vector2): void {
        this._context.moveTo(position.x, position.y);
    }

    lineTo(end: Vector2): void {
        this._context.lineTo(end.x, end.y);
    }

    quadraticCurveTo(control: Vector2, end: Vector2): void {
        this._context.quadraticCurveTo(control.x, control.y, end.x, end.y);
    }

    cubicCurveTo(control1: Vector2, control2: Vector2, end: Vector2): void {
        this._context.bezierCurveTo(
            control1.x, 
            control1.y, 
            control2.x, 
            control2.y,
            end.x,
            end.y);
    }

    ellipse(center: Vector2, radius: Vector2, startAngle: number, endAngle: number, xAxisRotation: number): void {
        this._context.ellipse(center.x, center.y, radius.x, radius.y, xAxisRotation, startAngle, endAngle);
    }
}