import { Vector2 } from '../../Math';
import { Brush, Pen } from '../../Style';
import { Transform } from '../../Transform';
import { IClosedShapeControls } from './Interfaces/IClosedShapeControls';
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

    override get style(): ClosedShapeStyle {
        return this._style;
    }

    get strokeStyle(): Pen {
        return this._style.stroke;
    }

    get fillStyle(): Brush {
        return this._style.fill;
    }

    override setPosition(position: Vector2): ClosedShapeItem {
        return new ClosedShapeItem(
            position,
            this.transform,
            this._controls,
            this._style
        );
    }

    override setTransform(transform: Transform): ClosedShapeItem {
        return new ClosedShapeItem(
            this.position,
            transform,
            this._controls,
            this._style
        );
    }

    override transformControls(transform: Transform): ClosedShapeItem {
        return new ClosedShapeItem(
            this.position,
            this.transform,
            this._controls.transform(transform),
            this._style
        );
    }

    setStrokeStyle(stroke: Pen): ClosedShapeItem {
        return new ClosedShapeItem(
            this.position,
            this.transform,
            this._controls,
            this._style.setStroke(stroke)
        );
    }

    setFillStyle(fill: Brush): ClosedShapeItem {
        return new ClosedShapeItem(
            this.position,
            this.transform,
            this._controls,
            this._style.setFill(fill)
        );
    }
}