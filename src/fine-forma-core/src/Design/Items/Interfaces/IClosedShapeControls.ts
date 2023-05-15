import { ClosedPath } from '../../../Path/ClosedPath';
import { Transform } from '../../../Transform';

export interface IClosedShapeControls {

    get closedPath(): ClosedPath;

    transform(transform: Transform): IClosedShapeControls;
}