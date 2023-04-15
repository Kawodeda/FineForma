import { IPathBuilder } from '../Path/IPathBuilder';
import { Color } from '../Style/Color/Color';
import { IFillStyleContext } from '../Style/IFillStyleContext';
import { Transform } from '../Transform';

export interface IRenderingContext extends IFillStyleContext {

    get pathBuilder(): IPathBuilder;

    setTransform(transform: Transform): void;

    setStrokeStyle(color: Color): void;

    setLineWidth(width: number): void;

    setLineDash(segments: number[], dahsOffset: number): void;

    stroke(): void;

    fill(): void;

    drawImage(image: Uint8Array, x: number, y: number, width: number, height: number): void;

    save(): void;

    restore(): void;
}