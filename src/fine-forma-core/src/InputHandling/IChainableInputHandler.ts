import { IInputHandler } from './IInputHandler';

export interface IChainableInputHandler extends IInputHandler {

    get next(): IChainableInputHandler | null;
}