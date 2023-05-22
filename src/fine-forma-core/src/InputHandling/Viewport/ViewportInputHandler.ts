import { IChainableInputHandler, IKeyboardEvent, IMouseEventArgs, IWheelEvent } from '..';
import { AddZoomCommand, Command, ICommand, ScrollCommand, ZoomCommand } from '../../Commands';
import { Vector2 } from '../../Math';

export class ViewportInputHandler implements IChainableInputHandler {
    
    private readonly _next: IChainableInputHandler | null;

    constructor(next: IChainableInputHandler | null = null) {
        this._next = next;
    }

    get next(): IChainableInputHandler | null {
        return this._next;
    }

    mouseDown(event: IMouseEventArgs): ICommand {
        throw new Error('Method not implemented.');
    }

    mouseUp(event: IMouseEventArgs): ICommand {
        throw new Error('Method not implemented.');
    }

    mouseMove(event: IMouseEventArgs): ICommand {
        return new Command();
    }

    wheel(event: IWheelEvent): ICommand {
        if (event.ctrlKey) {
            return new Command([], [
                new AddZoomCommand(event.delta.y / -500)
            ]);
        }
        if (event.shiftKey) {
            const scroll = event.delta.scale(1 / 4);

            return new Command([], [
                new ScrollCommand(new Vector2(scroll.y, scroll.x))
            ]);
        }

        return new Command([], [
            new ScrollCommand(event.delta.scale(1 / 4))
        ]);
    }

    keyDown(event: IKeyboardEvent): ICommand {
        throw new Error('Method not implemented.');
    }

    keyUp(event: IKeyboardEvent): ICommand {
        throw new Error('Method not implemented.');
    }
}