import { IChainableInputHandler, ICommandExecutor, IInputReceiver, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '.';
import { ICommand } from '../Commands';

export class InputReceiver implements IInputReceiver {
    
    private readonly _inputHandler: IChainableInputHandler;
    private readonly _commandExecutor: ICommandExecutor;

    constructor(inputHandler: IChainableInputHandler, commandExecutor: ICommandExecutor) {
        this._inputHandler = inputHandler;
        this._commandExecutor = commandExecutor;
    }

    sendMouseDown(event: IMouseEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.mouseDown(event)
        );
    }
    
    sendMouseUp(event: IMouseEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.mouseUp(event)
        );
    }
    
    sendMouseMove(event: IMouseEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.mouseMove(event)
        );
    }
    
    sendWheel(event: IWheelEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.wheel(event)
        );
    }
    
    sendKeyDown(event: IKeyboardEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.keyDown(event)
        );
    }
    
    sendKeyUp(event: IKeyboardEventArgs): Promise<void> {
        return this._execute(
            this._inputHandler.keyUp(event)
        );
    }

    private _execute(command: ICommand): Promise<void> {
        return this._commandExecutor.execute(command);
    }
}