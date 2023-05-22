import { Inject, Injectable } from '@angular/core';

import { IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs, MouseButton, Vector2 } from 'fine-forma-core';

import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { IInputHandlingService } from './i-input-handling-service';

@Injectable()
export class InputHandlingService implements IInputHandlingService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    mouseDown(event: MouseEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendMouseDown(
            this._toMouseEventArgs(event)
        );
    }
    
    mouseUp(event: MouseEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendMouseUp(
            this._toMouseEventArgs(event)
        );
    }
    
    mouseMove(event: MouseEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendMouseMove(
            this._toMouseEventArgs(event)
        );
    }
    
    wheel(event: WheelEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendWheel(
            this._toWheelEventArgs(event)
        );
    }
    
    keyDown(event: KeyboardEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendKeyDown(
            this._toKeyboardEventArgs(event)
        );
    }
    
    keyUp(event: KeyboardEvent): Promise<void> {
        return this._viewerProvider.viewer.inputReceiver.sendKeyUp(
            this._toKeyboardEventArgs(event)
        );
    }

    private _toMouseEventArgs(event: MouseEvent): IMouseEventArgs {
        return {
            button: this._convertMouseButton(event.button),
            position: new Vector2(event.clientX, event.clientY),
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey
        };
    }

    private _toWheelEventArgs(event: WheelEvent): IWheelEventArgs {
        return {
            delta: new Vector2(event.deltaX, event.deltaY),
            button: this._convertMouseButton(event.button),
            position: new Vector2(event.clientX, event.clientY),
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey
        };
    }

    private _toKeyboardEventArgs(event: KeyboardEvent): IKeyboardEventArgs {
        return {
            code: event.code,
            altKey: event.altKey,
            shiftKey: event.shiftKey,
            ctrlKey: event.ctrlKey,
            repeat: event.repeat
        };
    }

    private _convertMouseButton(button: number): MouseButton {
        switch (button) {
            case 1:
                return 'middle';
            case 2:
                return 'right';
            default:
                return 'left';
        }
    }
}