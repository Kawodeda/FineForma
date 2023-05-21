import { IMouseEventArgs } from '..';
import { Vector2 } from '../../Math';

export interface IWheelEvent extends IMouseEventArgs {

    get delta(): Vector2;
}