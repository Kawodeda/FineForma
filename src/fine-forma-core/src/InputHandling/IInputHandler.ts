import { IMouseEventArgs, IWheelEventArgs, IKeyboardEventArgs } from '.';
import { ICommand } from '../Commands';

export interface IInputHandler {

    mouseDown(event: IMouseEventArgs): ICommand;

    mouseUp(event: IMouseEventArgs): ICommand;

    mouseMove(event: IMouseEventArgs): ICommand;

    wheel(event: IWheelEventArgs): ICommand;

    keyDown(event: IKeyboardEventArgs): ICommand;

    keyUp(event: IKeyboardEventArgs): ICommand;
}