import { IChainableInputHandler, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '.';
import { ICommand } from '../Commands';
import { IInputHandlerState, IInputHandlerStateContext } from './State';

export abstract class BaseInputHandler implements IChainableInputHandler, IInputHandlerStateContext {

    protected readonly _next: IChainableInputHandler | null;

    protected abstract _state: IInputHandlerState;

    constructor(next: IChainableInputHandler | null = null) {
        this._next = next;
    }

    get next(): IChainableInputHandler | null {
        return this._next;
    }

    set state(state: IInputHandlerState) {
        this._state = state;
    }

    mouseDown(event: IMouseEventArgs): ICommand {
        return this._state.mouseDown(event);
    }

    mouseUp(event: IMouseEventArgs): ICommand {
        return this._state.mouseUp(event);
    }

    mouseMove(event: IMouseEventArgs): ICommand {
        return this._state.mouseMove(event);
    }

    wheel(event: IWheelEventArgs): ICommand {
        return this._state.wheel(event);
    }

    keyDown(event: IKeyboardEventArgs): ICommand {
        return this._state.keyDown(event);
    }

    keyUp(event: IKeyboardEventArgs): ICommand {
        return this._state.keyUp(event);
    }
}