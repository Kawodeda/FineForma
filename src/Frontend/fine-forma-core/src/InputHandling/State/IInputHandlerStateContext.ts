import { IChainableInputHandler } from '..';
import { IInputHandlerState } from './IInputHandlerState';

export interface IInputHandlerStateContext {

    get next(): IChainableInputHandler | null;

    set state(state: IInputHandlerState);
}