import { IMouseEventArgs, IWheelEventArgs, IKeyboardEventArgs, IInputHandlingConfiguration } from '..';
import { AddZoomAtCommand, Command, ICommand } from '../../Commands';
import { IInputHandlerState, IInputHandlerStateContext } from '../State';

const ZOOM_FACTOR = -1 / 500;

export class BaseState implements IInputHandlerState {
    
    protected readonly _configuration: IInputHandlingConfiguration;
    protected readonly _context: IInputHandlerStateContext;

    constructor(configuration: IInputHandlingConfiguration, context: IInputHandlerStateContext) {
        this._configuration = configuration;
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
        if (event.ctrlKey) {
            return new Command([], [
                new AddZoomAtCommand(this._wheelZoom(event), event.workspacePosition)
            ]);
        }

        return Command.empty;
    }

    keyDown(event: IKeyboardEventArgs): ICommand {
        return this._context.next?.keyDown(event) ?? Command.empty;
    }

    keyUp(event: IKeyboardEventArgs): ICommand {
        return this._context.next?.keyUp(event) ?? Command.empty;
    }

    private _wheelZoom(event: IWheelEventArgs): number {
        return event.delta.y * ZOOM_FACTOR * this._configuration.wheelZoomSensitivity;
    }
}