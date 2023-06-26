import { IMouseEventArgs } from '..';
import { add, last } from '../../ArrayUtils';
import { AddItemCommand, Command, ICommand, RemoveItemCommand } from '../../Commands';
import { ClosedShapeItem, Item, OpenShapeItem, PathControls } from '../../Design';
import { Vector2 } from '../../Math';
import { ClosedPath, Segment } from '../../Path';
import { simplify } from '../../Splineworks';
import { BaseInputHandlerState, IInputHandlerStateContext } from '../State';
import { IdleState } from './IdleState';

export class DrawingState extends BaseInputHandlerState {

    private readonly _points: readonly Vector2[];
    private readonly _drawnItem: Item;

    constructor(context: IInputHandlerStateContext, points: readonly Vector2[], drawnItem: Item) {
        super(context);

        this._points = points;
        this._drawnItem = drawnItem;
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            this._context.state = new IdleState(this._context);

            return this._drawnItem.controls.path.segments.length === 0 
                ? new Command([new RemoveItemCommand(this._drawnItem)])
                : Command.empty;
        }

        return super.mouseUp(event);
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        console.log('points', this._points);
        const newPoint = this._drawnItem.transform.matrix.inverse().applyTo(event.workspacePosition.subtract(this._drawnItem.position));
        const updatedPoints = add(this._points, newPoint);
        console.log('updated points', updatedPoints);
        const simplifiedPath = simplify(updatedPoints, 0.1);
        const updatedItem = this._setPath(this._drawnItem, simplifiedPath);
        console.log('path', simplifiedPath);
        this._context.state = new DrawingState(this._context, updatedPoints, updatedItem);

        return new Command([
            new RemoveItemCommand(this._drawnItem),
            new AddItemCommand(updatedItem)
        ]);
    }

    private _pathEnd(): Vector2 {
        if (this._drawnItem.controls.path.segments.length !== 0) {
            const lastSegment = last(this._drawnItem.controls.path.segments);

            return lastSegment.end;
        }

        return Vector2.zero;
    }

    private _setPath(item: Item, segments: readonly Segment[]): Item {
        const controls = new PathControls(new ClosedPath(segments));

        if (item instanceof ClosedShapeItem) {
            return new ClosedShapeItem(item.position, item.transform, controls, item.style);
        }
        if (item instanceof OpenShapeItem) {
            return new OpenShapeItem(item.position, item.transform, controls, item.style);
        }

        throw new Error('Image item is not supported in shape drawing');
    }
}