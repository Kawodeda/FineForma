import { IMouseEventArgs } from '..';
import { Command, ICommand, ResizeItemCommand, SelectItemAtCommand } from '../../Commands';
import { Rectangle, Vector2, lessOrNearlyEquals } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { IResizeInputHandlerStateContext } from './IResizeInputHandlerStateContext';
import { IdleState } from './IdleState';
import { ResizeGrip } from './ResizeGrip';

export class ResizeState extends BaseInputHandlerState<IResizeInputHandlerStateContext> {

    private readonly _capturedGrip: ResizeGrip;
    
    constructor(context: IResizeInputHandlerStateContext, capturedGrip: ResizeGrip) {
        super(context);

        this._capturedGrip = capturedGrip;
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }

        return super.mouseUp(event);
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        const resizedRectangle = this._getResizedItemBounds(event.workspacePosition);
        const { layerIndex, itemIndex } = this._context.design.getIndexOf(this._context.selection.single);

        this._context.state = new ResizeState(this._context, this._capturedGrip);

        return new Command([
            new ResizeItemCommand(this._context.selection.single, resizedRectangle)
        ], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]);
    }

    private _getResizedItemBounds(mousePosition: Vector2): Rectangle {
        const selectionRectangle = this._context.selection.single.controls.path.bounds.rectangle;
        const transform = this._context.selection.single.transform.matrix.inverse();
        const gripShift = transform.applyTo(
            mousePosition.subtract(this._context.selection.single.position)
        )
        .subtract(this._capturedGrip.getBounds(selectionRectangle).center);
        const resizedRectangle = this._capturedGrip.resizeRectangle(selectionRectangle, gripShift);

        return this._constrainResize(selectionRectangle, resizedRectangle);
    }

    private _constrainResize(initialBounds: Rectangle, resizedBounds: Rectangle): Rectangle {
        const center = new Vector2(
            lessOrNearlyEquals(resizedBounds.width, 0) ? initialBounds.center.x : resizedBounds.center.x,
            lessOrNearlyEquals(resizedBounds.height, 0) ? initialBounds.center.y : resizedBounds.center.y
        );
        
        return Rectangle.from(
            center,
            lessOrNearlyEquals(resizedBounds.width, 0) ? initialBounds.width : resizedBounds.width,
            lessOrNearlyEquals(resizedBounds.height, 0) ? initialBounds.height : resizedBounds.height
        );
    }
}