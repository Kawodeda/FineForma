import { IInputHandlerState, IInputHandlerStateContext } from '.';
import { IMouseEventArgs, IWheelEventArgs, IKeyboardEventArgs } from '..';
import { ICommand, Command } from '../../Commands';

export abstract class BaseInputHandlerState<TContext extends IInputHandlerStateContext = IInputHandlerStateContext> implements IInputHandlerState {

    protected readonly _context: TContext;

    constructor(context: TContext) {
        this._context = context;
    }

    mouseDown(event: IMouseEventArgs): ICommand {
        return this._context.next?.mouseDown(event) ?? Command.empty;
    }
    
    mouseUp(event: IMouseEventArgs): ICommand {
        return this._context.next?.mouseUp(event) ?? Command.empty;
    }
    
    mouseMove(event: IMouseEventArgs): ICommand {
        return this._context.next?.mouseMove(event) ?? Command.empty;
    }
    
    wheel(event: IWheelEventArgs): ICommand {
        return this._context.next?.wheel(event) ?? Command.empty;
    }
    
    keyDown(event: IKeyboardEventArgs): ICommand {
        return this._context.next?.keyDown(event) ?? Command.empty;
    }
    
    keyUp(event: IKeyboardEventArgs): ICommand {
        return this._context.next?.keyUp(event) ?? Command.empty;
    }
}