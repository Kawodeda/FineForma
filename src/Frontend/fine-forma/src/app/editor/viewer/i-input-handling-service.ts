import { InjectionToken } from '@angular/core';

export const INPUT_HANDLING_SERVICE = new InjectionToken<IInputHandlingService>('input-handling-service');

export interface IInputHandlingService {

    mouseDown(event: MouseEvent): Promise<void>;

    mouseUp(event: MouseEvent): Promise<void>;

    mouseMove(event: MouseEvent): Promise<void>;

    wheel(event: WheelEvent): Promise<void>;

    keyDown(event: KeyboardEvent): Promise<void>;

    keyUp(event: KeyboardEvent): Promise<void>;
}