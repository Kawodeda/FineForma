import { Vector2 } from '../../Math';
import { Transform } from '../../Transform';
import { IClosedShapeControls } from './Interfaces/IClosedShapeControls';
import { IItemStyle } from './Interfaces/IItemStyle';
import { IShapeControls } from './Interfaces/IShapeControls';
import { Item } from './Item';
import { ClosedShapeStyle } from './Style/ClosedShapeStyle';

export class ClosedShapeItem extends Item {

    private readonly _controls: IClosedShapeControls;
    private readonly _style: ClosedShapeStyle;

    constructor(position: Vector2, transform: Transform, controls: IClosedShapeControls, style: ClosedShapeStyle) {
        super(position, transform);

        this._controls = controls;
        this._style = style;
    }

    override get controls(): IShapeControls {
        return {
            path: this._controls.closedPath
        };
    }

    override get style(): IItemStyle {
        return this._style;
    }

    override setPosition(position: Vector2): Item {
        return new ClosedShapeItem(
            position,
            this.transform,
            this._controls,
            this._style
        );
    }

    override setTransform(transform: Transform): Item {
        return new ClosedShapeItem(
            this.position,
            transform,
            this._controls,
            this._style
        );
    }
}