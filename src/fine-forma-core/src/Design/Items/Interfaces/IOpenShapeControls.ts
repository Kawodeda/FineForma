import { OpenPath } from '../../../Path/OpenPath';
import { Transform } from '../../../Transform';


export interface IOpenShapeControls {
    
    get openPath(): OpenPath;

    transform(transform: Transform): IOpenShapeControls;
}