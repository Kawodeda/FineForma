import { IMouseEventArgs } from '..';
import { Command, ICommand, MoveItemCommand, SelectItemAtCommand } from '../../Commands';
import { Vector2 } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { ISelectionInputHandlerStateContext } from './ISelectionInputHandlerStateContext';
import { IdleState } from './IdleState';

export class SelectionDragState extends BaseInputHandlerState<ISelectionInputHandlerStateContext> {

    private readonly _prevMousePosition: Vector2;

    constructor(context: ISelectionInputHandlerStateContext, prevMousePosition: Vector2) {
        super(context);

        this._prevMousePosition = prevMousePosition;
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        this._context.state = new SelectionDragState(this._context, event.workspacePosition);
        const itemIndexes = this._context.selectionContext.selection.items
            .map(item => this._context.designContext.design.getIndexOf(item));

        return new Command(
            this._context.selectionContext.selection.items.map(
                item => new MoveItemCommand(
                    item,
                    event.workspacePosition.subtract(this._prevMousePosition)
                )
            ), 
            [],
            itemIndexes.map(index => new SelectItemAtCommand(index.layerIndex, index.itemIndex))
        );
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }

        return super.mouseUp(event);
    }
}