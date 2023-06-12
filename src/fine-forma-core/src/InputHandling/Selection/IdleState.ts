import { IMouseEventArgs } from '..';
import { ClearSelectionCommand, Command, ICommand, SelectItemCommand } from '../../Commands';
import { Vector2 } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { ISelectionInputHandlerStateContext } from './ISelectionInputHandlerStateContext';
import { SelectionDragState } from './SelectionDragState';

export class IdleState extends BaseInputHandlerState<ISelectionInputHandlerStateContext> {

    override mouseDown(event: IMouseEventArgs): ICommand {
        if (event.button !== 'left') {
            return super.mouseDown(event);
        }

        return this._context.hitTestService.hitTest(event.workspacePosition).item.caseOf({
            just: item => {
                this._context.state = new SelectionDragState(this._context, event.workspacePosition);

                return new Command([], [], [
                    new SelectItemCommand(item)
                ]);
            },
            nothing: () => super.mouseDown(event)
        });
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button !== 'left') {
            return super.mouseUp(event);
        }

        return this._context.selectionContext.selection.isSingle && this._doesHitSelectedItem(event.workspacePosition)
            ? super.mouseUp(event)
            : new Command([], [], [
                new ClearSelectionCommand()
            ]);
    }

    private _doesHitSelectedItem(point: Vector2): boolean {
        return this._context.hitTestService.hitTest(point).item.caseOf({
            just: item => item === this._context.selectionContext.selection.single,
            nothing: () => false
        });
    }
}