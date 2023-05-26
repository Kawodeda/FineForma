import { IChainableInputHandler, IKeyboardEventArgs, IMouseEventArgs, IWheelEventArgs } from '..';
import { AddZoomAtCommand, Command, ICommand, ScrollCommand } from '../../Commands';
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
                new AddZoomAtCommand(event.delta.y / -500, event.position)
            ]);
        }
        if (event.shiftKey) {
            const scroll = event.delta.scale(1 / 4);

            return new Command([], [
                new ScrollCommand(new Vector2(scroll.y, scroll.x))
            ]);
        }

        return new Command([], [
            new ScrollCommand(event.delta.scale(1 / 3))
        ]);
    }

    keyDown(event: IKeyboardEventArgs): ICommand {
        return this.next?.keyDown(event) ?? new Command();
    }

    keyUp(event: IKeyboardEventArgs): ICommand {
        return this.next?.keyUp(event) ?? new Command();
    }
}