import { IMouseEventArgs } from '..';
import { Command, ICommand } from '../../Commands';
import { Rectangle, Vector2 } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { IRotationInputHandlerStateContext } from './IRotationInputHandlerStateContext';
import { RotationState } from './RotationState';

export class IdleState extends BaseInputHandlerState<IRotationInputHandlerStateContext> {

    get rotationGripRectangle(): Rectangle {
        return this._context.rotationGrip.getRectangle(
            this._context.selection.single.controls.path.bounds.rectangle,
            this._context.viewport.zoom
        );
    }

    override mouseDown(event: IMouseEventArgs): ICommand {
        if (this._context.selection.isSingle 
            && event.button === 'left' 
            && this._hitTestRotationGrip(event.workspacePosition)) {
            this._context.state = new RotationState(this._context, event.workspacePosition);

            return Command.empty;
        }

        return super.mouseDown(event);
    }

    private _hitTestRotationGrip(mousePosition: Vector2): boolean {
        return this._context.hitTestService.hitTestRectangle(
            mousePosition.subtract(this._context.selection.single.position),
            this.rotationGripRectangle,
            this._context.selection.single.transform
        );
    }
}