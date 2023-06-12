import { Vector2 } from '../../../Math';
import { Brush, Brushes, Pen } from '../../../Style';
import { Transform } from '../../../Transform';
import { ClosedShapeItem } from '../ClosedShapeItem';
import { IClosedShapeControls } from '../Interfaces';
import { ClosedShapeStyle } from '../Style';

export class ClosedShapeBuilder {

    private readonly _controls: IClosedShapeControls;
    private readonly _position: Vector2;
    private readonly _transform: Transform;
    private readonly _style: ClosedShapeStyle;

    constructor(
        controls: IClosedShapeControls, 
        position: Vector2 = Vector2.zero, 
        transform: Transform = Transform.createIdentity(), 
        style: ClosedShapeStyle = ClosedShapeBuilder._defaultStyle) {
        this._controls = controls;
        this._position = position;
        this._transform = transform;
        this._style = style;
    }

    private static get _defaultStyle(): ClosedShapeStyle {
        return new ClosedShapeStyle(Pen.empty, Brushes.black());
    }

    setPosition(position: Vector2): ClosedShapeBuilder {
        return new ClosedShapeBuilder(this._controls, position, this._transform, this._style);
    }

    setTransform(transform: Transform): ClosedShapeBuilder {
        return new ClosedShapeBuilder(this._controls, this._position, transform, this._style);
    }

    setStyle(style: ClosedShapeStyle): ClosedShapeBuilder {
        return new ClosedShapeBuilder(this._controls, this._position, this._transform, style);
    }

    setStroke(stroke: Pen): ClosedShapeBuilder {
        return new ClosedShapeBuilder(
            this._controls, 
            this._position, 
            this._transform, 
            new ClosedShapeStyle(stroke, this._style.fill)
        );
    }

    setFill(fill: Brush): ClosedShapeBuilder {
        return new ClosedShapeBuilder(
            this._controls, 
            this._position, 
            this._transform, 
            new ClosedShapeStyle(this._style.stroke, fill)
        );
    }

    build(): ClosedShapeItem {
        return new ClosedShapeItem(this._position, this._transform, this._controls, this._style);
    }
}