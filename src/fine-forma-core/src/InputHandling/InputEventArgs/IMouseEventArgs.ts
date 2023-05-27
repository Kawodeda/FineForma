import { Vector2 } from '../../Math';

export type MouseButton = 'unknown' | 'left' | 'right' | 'middle';

export interface IMouseEventArgs {

    get button(): MouseButton;

    get position(): Vector2;

    get altKey(): boolean;

    get shiftKey(): boolean;

    get ctrlKey(): boolean;
}