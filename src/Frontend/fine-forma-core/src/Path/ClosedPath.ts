import { Transform } from '../Transform';
import { IPathBuilder } from './IPathBuilder';
import { Path } from './Path';

export class ClosedPath extends Path {

    override build(pathBuilder: IPathBuilder): void {
        pathBuilder.beginPath();
        for (const segment of this.segments) {
            segment.addToPath(pathBuilder);
        }
        
        pathBuilder.closePath();
    }

    override transform(transform: Transform): ClosedPath {
        return new ClosedPath(this._transform(transform));
    }
}