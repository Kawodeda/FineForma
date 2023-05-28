import { IInputHandlingConfiguration, IMouseEventArgs } from '..';
import { Command, ICommand, ScrollCommand } from '../../Commands';
import { Vector2 } from '../../Math';
import { IInputHandlerStateContext } from '../State';
import { BaseState } from './BaseState';
import { IdleState } from './IdleState';

export class WorkspaceDragState extends BaseState {

    private readonly _prevMousePosition: Vector2;

    constructor(
        configuration: IInputHandlingConfiguration, 
        context: IInputHandlerStateContext, 
        mousePosition: Vector2) {
        super(configuration, context);

        this._prevMousePosition = mousePosition;
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        this._context.state = new WorkspaceDragState(this._configuration, this._context, event.viewportPosition);

        return new Command([], [
            new ScrollCommand(this._prevMousePosition.subtract(event.viewportPosition))
        ]);
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'right') {
            this._context.state = new IdleState(this._configuration, this._context);
        }

        return super.mouseUp(event);
    }
}