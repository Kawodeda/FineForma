import { IPathBuilder } from './IPathBuilder';
import { Path } from './Path';

export class OpenPath extends Path {

    override build(pathBuilder: IPathBuilder): void {
        pathBuilder.beginPath();
        for (const segment of this.segments) {
            segment.addToPath(pathBuilder);
        }
    }
}