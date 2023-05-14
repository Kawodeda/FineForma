import { Transform } from '../Transform';
import { IPathBuilder } from './IPathBuilder';
import { Path } from './Path';

export class OpenPath extends Path {

    override build(pathBuilder: IPathBuilder): void {
        pathBuilder.beginPath();
        for (const segment of this.segments) {
            segment.addToPath(pathBuilder);
        }
    }

    override transform(transform: Transform): OpenPath {
        return new OpenPath(this._transform(transform));
    }
}