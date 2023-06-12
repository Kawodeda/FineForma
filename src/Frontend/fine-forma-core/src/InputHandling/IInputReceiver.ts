import { IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '.';

export interface IInputReceiver {

    sendMouseDown(event: IMouseEventArgs): Promise<void>;

    sendMouseUp(event: IMouseEventArgs): Promise<void>;

    sendMouseMove(event: IMouseEventArgs): Promise<void>;

    sendWheel(event: IWheelEventArgs): Promise<void>;

    sendKeyDown(event: IKeyboardEventArgs): Promise<void>;

    sendKeyUp(event: IKeyboardEventArgs): Promise<void>;
}