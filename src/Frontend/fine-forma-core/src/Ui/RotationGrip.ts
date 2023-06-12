import { Rectangle, Vector2 } from '../Math';
import { IRotationGrip } from './IRotationGrip';

export class RotationGrip implements IRotationGrip {
    
    private readonly _size: number;
    private readonly _offset: number;

    constructor(size: number, offset: number) {
        this._size = size;
        this._offset = offset;
    }

    get size(): number {
        return this._size;
    }
    
    get offset(): number {
        return this._offset;
    }
    
    getRectangle(itemBounds: Rectangle, zoom: number): Rectangle {
        const center = itemBounds.center.add(new Vector2(0, itemBounds.height / 2 + this.offset / zoom));

        return Rectangle.from(center, this.size / zoom, this.size / zoom);
    }
}