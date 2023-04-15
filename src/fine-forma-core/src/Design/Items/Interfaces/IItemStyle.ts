import { IStyleContext } from './IStyleContext';

export interface IItemStyle {

    applyTo(context: IStyleContext): void;
}