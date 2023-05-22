import { IChainableInputHandler, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { AddZoomCommand, Command, ICommand, ScrollCommand } from '../../Commands';
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
        return new Command();
    }

    mouseUp(event: IMouseEventArgs): ICommand {
        return new Command();
    }

    mouseMove(event: IMouseEventArgs): ICommand {
        return new Command();
    }

    wheel(event: IWheelEventArgs): ICommand {
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

    keyDown(event: IKeyboardEventArgs): ICommand {
        return new Command();
    }

    keyUp(event: IKeyboardEventArgs): ICommand {
        return new Command();
    }
}