import { IMouseEventArgs } from '..';
import { Command, ICommand, MoveItemCommand, SelectItemAtCommand } from '../../Commands';
import { Item } from '../../Design';
import { Vector2 } from '../../Math';
import { BaseState } from './BaseState';
import { ISelectionInputHandlerStateContext } from './ISelectionInputHandlerStateContext';
import { IdleState } from './IdleState';

export class SelectionDragState extends BaseState {

    private readonly _prevMousePosition: Vector2;

    constructor(context: ISelectionInputHandlerStateContext, prevMousePosition: Vector2) {
        super(context);

        this._prevMousePosition = prevMousePosition;
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        this._context.state = new SelectionDragState(this._context, event.workspacePosition);
        const itemIndexes = this._context.selectionContext.selection.items.map(item => this._getItemIndex(item));

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

    private _getItemIndex(item: Item): { layerIndex: number; itemIndex: number } {
        const layer = this._context.designContext.design.getLayerOf(item);
        const layerIndex = this._context.designContext.design.layers.indexOf(layer);
        const itemIndex = layer.items.indexOf(item);

        return {
            layerIndex: layerIndex,
            itemIndex: itemIndex
        };
    }
}