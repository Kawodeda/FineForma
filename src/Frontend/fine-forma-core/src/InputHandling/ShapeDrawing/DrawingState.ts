import { IMouseEventArgs } from '..';
import { add, last } from '../../ArrayUtils';
import { AddItemCommand, Command, ICommand, RemoveItemCommand } from '../../Commands';
import { ClosedShapeItem, Item, OpenShapeItem, PathControls } from '../../Design';
import { Vector2 } from '../../Math';
import { ClosedPath, LineSegment, Segment } from '../../Path';
import { BaseInputHandlerState, IInputHandlerStateContext } from '../State';
import { IdleState } from './IdleState';

export class DrawingState extends BaseInputHandlerState {

    private readonly _drawnItem: Item;

    constructor(context: IInputHandlerStateContext, drawnItem: Item) {
        super(context);

        this._drawnItem = drawnItem;
    }

    override mouseUp(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            this._context.state = new IdleState(this._context);

            return Command.empty;
        }

        return super.mouseUp(event);
    }

    override mouseMove(event: IMouseEventArgs): ICommand {
        const newPoint = this._drawnItem.transform.matrix.inverse().applyTo(event.workspacePosition.subtract(this._drawnItem.position));
        const newSegment = new LineSegment(this._pathEnd(), newPoint); 
        const updatedItem = this._addSegmentToPath(this._drawnItem, newSegment);
        
        this._context.state = new DrawingState(this._context, updatedItem);

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

    private _addSegmentToPath(item: Item, segment: Segment): Item {
        const controls = new PathControls(new ClosedPath(add(item.controls.path.segments, segment)));

        if (item instanceof ClosedShapeItem) {
            return new ClosedShapeItem(item.position, item.transform, controls, item.style);
        }
        if (item instanceof OpenShapeItem) {
            return new OpenShapeItem(item.position, item.transform, controls, item.style);
        }

        throw new Error('Image item is not supported in shape drawing');
    }
}