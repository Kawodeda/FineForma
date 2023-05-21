import { IMouseEventArgs, IWheelEvent, IKeyboardEvent } from '.';
import { ICommand } from '../Commands';

export interface IInputHandler {

    mouseDown(event: IMouseEventArgs): ICommand;

    mouseUp(event: IMouseEventArgs): ICommand;

    mouseMove(event: IMouseEventArgs): ICommand;

    wheel(event: IWheelEvent): ICommand;

    keyDown(event: IKeyboardEvent): ICommand;

    keyUp(event: IKeyboardEvent): ICommand;
}