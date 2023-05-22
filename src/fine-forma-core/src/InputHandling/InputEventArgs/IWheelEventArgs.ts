import { IMouseEventArgs } from '..';
import { Vector2 } from '../../Math';

export interface IWheelEventArgs extends IMouseEventArgs {

    get delta(): Vector2;
}