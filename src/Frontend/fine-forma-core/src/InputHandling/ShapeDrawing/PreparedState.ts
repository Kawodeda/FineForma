import { IMouseEventArgs } from '..';
import { AddItemCommand, Command, ICommand } from '../../Commands';
import { ClosedShapeItem, ClosedShapeStyle, PathControls } from '../../Design';
import { ClosedPath } from '../../Path';
import { Brushes, Pen } from '../../Style';
import { Transform } from '../../Transform';
import { BaseInputHandlerState } from '../State';
import { DrawingState } from './DrawingState';

export class PreparedState extends BaseInputHandlerState {
    
    override mouseDown(event: IMouseEventArgs): ICommand {
        if (event.button === 'left') {
            const item = new ClosedShapeItem(
                event.workspacePosition, 
                Transform.createIdentity(),
                new PathControls(new ClosedPath([])),
                new ClosedShapeStyle(Pen.empty, Brushes.black()));
            
            this._context.state = new DrawingState(this._context, item);

            return new Command([new AddItemCommand(item)]);
        }

        return super.mouseDown(event);
    }
}