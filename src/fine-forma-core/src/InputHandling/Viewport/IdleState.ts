import { IMouseEventArgs, IWheelEventArgs } from '..';
import { Command, CompositeCommand, ICommand, ScrollCommand } from '../../Commands';
import { Vector2 } from '../../Math';
import { BaseState } from './BaseState';
import { WorkspaceDragState } from './WorkspaceDragState';

const SCROLL_FACTOR = 1 / 4;

export class IdleState extends BaseState {

    override mouseDown(event: IMouseEventArgs): ICommand {
        if (event.button === 'right') {
            this._context.state = new WorkspaceDragState(this._configuration, this._context, event.viewportPosition);
        }

        return super.mouseDown(event);
    }

    override wheel(event: IWheelEventArgs): ICommand {
        const baseResult = super.wheel(event);

        if (!event.ctrlKey) {
            if (event.shiftKey) {
                return CompositeCommand.combine(baseResult, new Command([], [
                    new ScrollCommand(this._wheelHorizontalScroll(event))
                ]));
            }
    
            return CompositeCommand.combine(baseResult, new Command([], [
                new ScrollCommand(this._wheelScroll(event))
            ]));
        }

        return baseResult;
    }

    private _wheelHorizontalScroll(event: IWheelEventArgs): Vector2 {
        const verticalScroll = this._wheelScroll(event);

        return new Vector2(verticalScroll.y, verticalScroll.x);
    }

    private _wheelScroll(event: IWheelEventArgs): Vector2 {
        return event.delta.scale(SCROLL_FACTOR * this._configuration.wheelScrollSensitivity);
    }
}