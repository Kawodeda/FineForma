import { IKeyboardEvent, IMouseEventArgs, IWheelEvent } from '.';

export interface IInputReceiver {

    sendMouseDown(event: IMouseEventArgs): Promise<void>;

    sendMouseUp(event: IMouseEventArgs): Promise<void>;

    sendMouseMove(event: IMouseEventArgs): Promise<void>;

    sendWheel(event: IWheelEvent): Promise<void>;

    sendKeyDown(event: IKeyboardEvent): Promise<void>;

    sendKeyUp(event: IKeyboardEvent): Promise<void>;
}