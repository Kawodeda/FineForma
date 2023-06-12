import { IStyleContext } from './IStyleContext';

export interface IItemStyle {

    applyTo(context: IStyleContext): void;

    equals(other: IItemStyle): boolean;
}