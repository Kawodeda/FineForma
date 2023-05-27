import { IChainableInputHandler, IInputHandlingConfiguration, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { AddZoomAtCommand, Command, ICommand, ScrollCommand } from '../../Commands';
import { Vector2 } from '../../Math';

const ZOOM_FACTOR = -1 / 500;
const SCROLL_FACTOR = 1 / 4;

export class ViewportInputHandler implements IChainableInputHandler {
    
    private readonly _configuration: IInputHandlingConfiguration;
    private readonly _next: IChainableInputHandler | null;

    constructor(configuration: IInputHandlingConfiguration, next: IChainableInputHandler | null = null) {
        this._configuration = configuration;
        this._next = next;
    }

    get next(): IChainableInputHandler | null {
        return this._next;
    }

    mouseDown(event: IMouseEventArgs): ICommand {
        return this.next?.mouseDown(event) ?? new Command();
    }

    mouseUp(event: IMouseEventArgs): ICommand {
        return this.next?.mouseUp(event) ?? new Command();
    }

    mouseMove(event: IMouseEventArgs): ICommand {
        return this.next?.mouseMove(event) ?? new Command();
    }

    wheel(event: IWheelEventArgs): ICommand {
        if (event.ctrlKey) {
            return new Command([], [
                new AddZoomAtCommand(this._wheelZoom(event), event.position)
            ]);
        }
        if (event.shiftKey) {
            return new Command([], [
                new ScrollCommand(this._wheelHorizontalScroll(event))
            ]);
        }

        return new Command([], [
            new ScrollCommand(this._wheelScroll(event))
        ]);
    }

    keyDown(event: IKeyboardEventArgs): ICommand {
        return this.next?.keyDown(event) ?? new Command();
    }

    keyUp(event: IKeyboardEventArgs): ICommand {
        return this.next?.keyUp(event) ?? new Command();
    }

    private _wheelZoom(event: IWheelEventArgs): number {
        return event.delta.y * ZOOM_FACTOR * this._configuration.wheelZoomSensitivity;
    }

    private _wheelHorizontalScroll(event: IWheelEventArgs): Vector2 {
        const verticalScroll = this._wheelScroll(event);

        return new Vector2(verticalScroll.y, verticalScroll.x);
    }

    private _wheelScroll(event: IWheelEventArgs): Vector2 {
        return event.delta.scale(SCROLL_FACTOR * this._configuration.wheelScrollSensitivity);
    }
}