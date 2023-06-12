import { IKeyboardEventArgs, IMouseEventArgs } from '..';
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

    private get _selectionRectangle(): Rectangle {
        return this._context.selection.single.controls.path.bounds.rectangle;
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }

        return super.mouseUp(event);
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        if (!this._context.selection.isSingle) {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }

        return this._resizeSelection(this._toGripFrame(event.workspacePosition), event.shiftKey);
    }

    override keyDown(event: IKeyboardEventArgs): ICommand {
        if (!this._context.selection.isSingle) {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }
        if (event.shiftKey) {
            return this._resizeSelection(
                this._capturedGrip.getBounds(this._selectionRectangle).center, 
                true
            );
        }

        return super.keyDown(event);
    }

    private _resizeSelection(newGripPosition: Vector2, proportionalResize: boolean): ICommand {
        const resizedRectangle = this._getResizedItemBounds(newGripPosition, proportionalResize);
        const { layerIndex, itemIndex } = this._context.design.getIndexOf(this._context.selection.single);

        this._context.state = new ResizeState(this._context, this._capturedGrip);

        return new Command([
            new ResizeItemCommand(this._context.selection.single, resizedRectangle)
        ], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]);
    }

    private _toGripFrame(mousePosition: Vector2): Vector2 {
        const transform = this._context.selection.single.transform.matrix.inverse();

        return transform.applyTo(
            mousePosition.subtract(this._context.selection.single.position)
        );
    }

    private _getResizedItemBounds(newGripPosition: Vector2, proportionalResize: boolean): Rectangle {
        const result = this._capturedGrip.resizeRectangle(
            this._selectionRectangle, 
            this._getGripShift(newGripPosition),
            proportionalResize
        );

        return this._constrainNegativeResize(this._selectionRectangle, result);
    }

    private _getGripShift(newGripPosition: Vector2): Vector2 {
        return newGripPosition.subtract(
            this._capturedGrip.getBounds(this._selectionRectangle).center
        );
    }

    private _constrainNegativeResize(initialBounds: Rectangle, resizedBounds: Rectangle): Rectangle {
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