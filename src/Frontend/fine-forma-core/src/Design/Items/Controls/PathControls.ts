import { ClosedPath } from '../../../Path/ClosedPath';
import { OpenPath } from '../../../Path/OpenPath';
import { Path } from '../../../Path/Path';
import { Transform } from '../../../Transform';
import { IClosedShapeControls } from '../Interfaces/IClosedShapeControls';
import { IOpenShapeControls } from '../Interfaces/IOpenShapeControls';

export class PathControls implements IOpenShapeControls, IClosedShapeControls {

    private readonly _path: Path;
    
    constructor(path: Path) {
        this._path = path;
    }

    get path(): Path {
        return this._path;
    }

    get openPath(): OpenPath {
        return new OpenPath(this.path.segments);
    }

    get closedPath(): ClosedPath {
        return new ClosedPath(this.path.segments);
    }

    transform(transform: Transform): PathControls {
        return new PathControls(this.path.transform(transform));
    }
}