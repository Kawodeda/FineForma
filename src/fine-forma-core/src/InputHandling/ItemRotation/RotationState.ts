import { IMouseEventArgs } from '..';
import { Command, ICommand, RotateItemCommand, SelectItemAtCommand } from '../../Commands';
import { Vector2, radiansToDegree } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { IRotationInputHandlerStateContext } from './IRotationInputHandlerStateContext';
import { IdleState } from './IdleState';

export class RotationState extends BaseInputHandlerState<IRotationInputHandlerStateContext> {

    private readonly _prevMousePosition: Vector2;

    constructor(context: IRotationInputHandlerStateContext, prevMousePosition: Vector2) {
        super(context);

        this._prevMousePosition = prevMousePosition;
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

        const prevAngle = this._getAngle(this._prevMousePosition);
        const angle = this._getAngle(event.workspacePosition);
        const deltaAngle = angle - prevAngle;
        const itemIndex = this._context.design.getIndexOf(this._context.selection.single);

        this._context.state = new RotationState(this._context, event.workspacePosition);

        return new Command([
            new RotateItemCommand(this._context.selection.single, deltaAngle, this._context.selection.single.controls.path.bounds.rectangle.center)
        ], [], [
            new SelectItemAtCommand(itemIndex.layerIndex, itemIndex.itemIndex)
        ]);
    }

    private _getAngle(mousePosition: Vector2): number {
        const center = this._context.selection.single.transform.applyTo(
            this._context.selection.single.controls.path.bounds.rectangle.center
        );
        const delta = mousePosition
            .subtract(center)
            .subtract(this._context.selection.single.position);

        return radiansToDegree(Vector2.angle(new Vector2(1, 0), delta));
    }
}