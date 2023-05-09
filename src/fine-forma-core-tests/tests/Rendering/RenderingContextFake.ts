import { CanvasRenderingContext2D, Image, DOMMatrix } from 'canvas';
import { Buffer } from 'node:buffer';

import { IColorPreview, IRenderingContext, Transform, Vector2 } from 'fine-forma-core';

import { PathBuilderFake } from '../PathBuilderFake';
import { colorPreviewToHtml } from './Utils';

export class RenderingContextFake implements IRenderingContext {

    private readonly _context: CanvasRenderingContext2D;
    private readonly _pathBuilder: PathBuilderFake;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
        this._pathBuilder = new PathBuilderFake(this._context);
    }

    setTransform(transform: Transform): void {
        this._context.setTransform(new DOMMatrix([
            transform.matrix.m11,
            transform.matrix.m21,
            transform.matrix.m12,
            transform.matrix.m22,
            transform.matrix.d1,
            transform.matrix.d2
        ]));
    }

    transform(transform: Transform): void {
        this._context.transform(
            transform.matrix.m11,
            transform.matrix.m21,
            transform.matrix.m12,
            transform.matrix.m22,
            transform.matrix.d1,
            transform.matrix.d2
        );
    }

    setStrokeStyle(color: IColorPreview): void {
        this._context.strokeStyle = colorPreviewToHtml(color);
    }

    setLineWidth(width: number): void {
        this._context.lineWidth = width;
    }

    setLineDash(segments: number[], dahsOffset: number): void {
        this._context.setLineDash(segments);
        this._context.lineDashOffset = dahsOffset;
    }

    stroke(): void {
        this._context.stroke();
    }

    fill(): void {
        this._context.fill();
    }

    drawImage(image: Uint8ClampedArray, x: number, y: number, width: number, height: number): void {
        const base64Image = Buffer.from(image.buffer).toString('base64');
        const url = `data:image/png;base64,${base64Image}`;
        const img = new Image();

        img.onload = () => {
            this._context.drawImage(img, x, y, width, height);
        };

        img.src = url;
    }

    save(): void {
        this._context.save();
    }

    restore(): void {
        this._context.restore();
    }

    setFillStyle(color: IColorPreview): void {
        this._context.fillStyle = colorPreviewToHtml(color);
    }

    beginPath(): void {
        this._pathBuilder.beginPath();
    }
    
    closePath(): void {
        this._pathBuilder.closePath();
    }

    moveTo(position: Vector2): void {
        this._pathBuilder.moveTo(position);
    }

    lineTo(end: Vector2): void {
        this._pathBuilder.lineTo(end);
    }

    quadraticCurveTo(control: Vector2, end: Vector2): void {
        this._pathBuilder.quadraticCurveTo(control, end);
    }

    cubicCurveTo(control1: Vector2, control2: Vector2, end: Vector2): void {
        this._pathBuilder.cubicCurveTo(control1, control2, end);
    }

    ellipse(center: Vector2, radius: Vector2, startAngle: number, endAngle: number, xAxisRotation: number, anticlockwise: boolean): void {
        this._pathBuilder.ellipse(center, radius, startAngle, endAngle, xAxisRotation, anticlockwise);
    }
}