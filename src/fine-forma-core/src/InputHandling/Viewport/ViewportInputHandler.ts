import { IChainableInputHandler, IInputHandlingConfiguration, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { ICommand } from '../../Commands';
import { IInputHandlerStateContext } from '../State/IInputHandlerStateContext';
import { IInputHandlerState } from '../State';
import { IdleState } from './IdleState';

export class ViewportInputHandler implements IChainableInputHandler, IInputHandlerStateContext {
    
    private readonly _configuration: IInputHandlingConfiguration;
    private readonly _next: IChainableInputHandler | null;

    private _state: IInputHandlerState;

    constructor(configuration: IInputHandlingConfiguration, next: IChainableInputHandler | null = null) {
        this._configuration = configuration;
        this._next = next;
        this._state = new IdleState(this._configuration, this);
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