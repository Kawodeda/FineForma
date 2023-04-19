import { CanvasRenderingContext2D, Image } from 'canvas';

import { IColorPreview, IPathBuilder, IRenderingContext, Transform } from 'fine-forma-core';

import { PathBuilderFake } from '../PathBuilderFake';
import { colorPreviewToHtml } from './Utils';

export class RenderingContextFake implements IRenderingContext {

    private readonly _context: CanvasRenderingContext2D;
    private readonly _pathBuilder: PathBuilderFake;

    constructor(context: CanvasRenderingContext2D) {
        this._context = context;
        this._pathBuilder = new PathBuilderFake(this._context);
    }

    get pathBuilder(): IPathBuilder {
        return this._pathBuilder;
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
        const url = URL.createObjectURL(new Blob([image]));
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
}