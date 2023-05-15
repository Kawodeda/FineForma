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

    equals(other: Item): boolean {
        return this.position.equals(other.position)
            && this.transform.equals(other.transform)
            && this.controls.path.equals(other.controls.path)
            && this.style.equals(other.style);
    }

    abstract setPosition(position: Vector2): Item;

    abstract setTransform(transform: Transform): Item;

    abstract transformControls(transform: Transform): Item;
}