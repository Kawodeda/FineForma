import { IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { ICommand } from '../../Commands';

export interface IInputHandlerState {

    mouseDown(event: IMouseEventArgs): ICommand;

    mouseUp(event: IMouseEventArgs): ICommand;

    mouseMove(event: IMouseEventArgs): ICommand;

    wheel(event: IWheelEventArgs): ICommand;

    keyDown(event: IKeyboardEventArgs): ICommand;

    keyUp(event: IKeyboardEventArgs): ICommand;
}