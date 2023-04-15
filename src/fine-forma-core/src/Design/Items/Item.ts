import { Vector2 } from '../../Math';
import { Transform } from '../../Transform';
import { IItemStyle } from './Interfaces/IItemStyle';
import { IShapeControls } from './Interfaces/IShapeControls';

export abstract class Item {

    private readonly _position: Vector2;
    private readonly _transform: Transform;

    constructor(position: Vector2, transform: Transform) {
        this._position = position;
        this._transform = transform;
    }

    get position(): Vector2 {
        return this._position;
    }

    get transform(): Transform {
        return this._transform;
    }

    abstract get controls(): IShapeControls;

    abstract get style(): IItemStyle;
}