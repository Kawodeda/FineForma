import { IFillStyleContext } from './IFillStyleContext';

export abstract class Brush {

    abstract addToStyle(context: IFillStyleContext): void;

    abstract equals(other: Brush): boolean;
}