import { Maybe } from 'tsmonad';
import { IMouseEventArgs } from '..';
import { Command, ICommand } from '../../Commands';
import { Rectangle, Vector2 } from '../../Math';
import { BaseInputHandlerState } from '../State';
import { IResizeInputHandlerStateContext } from './IResizeInputHandlerStateContext';
import { ResizeGrip } from './ResizeGrip';
import { ResizeState } from './ResizeState';

export class IdleState extends BaseInputHandlerState<IResizeInputHandlerStateContext> {
    
    private get _resizeGrips(): readonly ResizeGrip[] {
        return [
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1, this._resizeGripSize, this._resizeGripSize),
                new Vector2(-1, -1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1.add(new Vector2(selection.width / 2, 0)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(0, -1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1.add(new Vector2(selection.width, 0)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(1, -1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1.add(new Vector2(selection.width, selection.height / 2)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(1, 0)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner2, this._resizeGripSize, this._resizeGripSize),
                new Vector2(1, 1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner2.subtract(new Vector2(selection.width / 2, 0)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(0, 1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1.add(new Vector2(0, selection.height)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(-1, 1)
            ),
            new ResizeGrip(
                selection => Rectangle.from(selection.corner1.add(new Vector2(0, selection.height / 2)), this._resizeGripSize, this._resizeGripSize),
                new Vector2(-1, 0)
            )
        ];
    }

    private get _resizeGripSize(): number {
        return this._context.resizeGripSize / this._context.viewport.zoom;
    }

    override mouseDown(event: IMouseEventArgs): ICommand {
        if (event.button !== 'left' || this._context.selection.isEmpty || this._context.selection.isMultiselection) {
            return super.mouseDown(event);
        }

        return this._hitTestGrips(event.workspacePosition).caseOf({
            just: grip => {
                this._context.state = new ResizeState(this._context, grip);

                return Command.empty;
            },
            nothing: () => super.mouseDown(event)
        });
    }

    private _hitTestGrips(workspacePoint: Vector2): Maybe<ResizeGrip> {
        const point = workspacePoint.subtract(this._context.selection.single.position)

        return Maybe.maybe(this._resizeGrips.find(grip => {
            return this._context.hitTestService.hitTestRectangle(
                point, 
                grip.getBounds(this._context.selection.single.controls.path.bounds.rectangle), 
                this._context.selection.single.transform
            )
        }));
    }
}