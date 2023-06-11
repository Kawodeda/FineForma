import { IWheelEventArgs, IInputHandlingConfiguration } from '..';
import { AddZoomAtCommand, Command, ICommand } from '../../Commands';
import { BaseInputHandlerState, IInputHandlerStateContext } from '../State';

const ZOOM_FACTOR = -1 / 500;

export class BaseState extends BaseInputHandlerState {
    
    protected readonly _configuration: IInputHandlingConfiguration;

    constructor(configuration: IInputHandlingConfiguration, context: IInputHandlerStateContext) {
        super(context);

        this._configuration = configuration;
    }

    override wheel(event: IWheelEventArgs): ICommand {
        if (event.ctrlKey) {
            return new Command([], [
                new AddZoomAtCommand(this._wheelZoom(event), event.workspacePosition)
            ]);
        }

        return Command.empty;
    }

    private _wheelZoom(event: IWheelEventArgs): number {
        return event.delta.y * ZOOM_FACTOR * this._configuration.wheelZoomSensitivity;
    }
}