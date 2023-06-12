import { Vector2 } from '../../../Math';
import { Brushes, Pen } from '../../../Style';
import { Transform } from '../../../Transform';
import { IOpenShapeControls } from '../Interfaces';
import { OpenShapeItem } from '../OpenShapeItem';
import { OpenShapeStyle } from '../Style';

export class OpenShapeBuilder {

    private readonly _controls: IOpenShapeControls;
    private readonly _position: Vector2;
    private readonly _transform: Transform;
    private readonly _style: OpenShapeStyle;

    constructor(
        controls: IOpenShapeControls, 
        position: Vector2 = Vector2.zero, 
        transform: Transform = Transform.createIdentity(), 
        style: OpenShapeStyle = OpenShapeBuilder._defaultStyle) {
        this._controls = controls;
        this._position = position;
        this._transform = transform;
        this._style = style;
    }

    private static get _defaultStyle(): OpenShapeStyle {
        return new OpenShapeStyle(new Pen(Brushes.black(), 1));
    }

    setPosition(position: Vector2): OpenShapeBuilder {
        return new OpenShapeBuilder(this._controls, position, this._transform, this._style);
    }

    setTransform(transform: Transform): OpenShapeBuilder {
        return new OpenShapeBuilder(this._controls, this._position, transform, this._style);
    }

    setStyle(style: OpenShapeStyle): OpenShapeBuilder {
        return new OpenShapeBuilder(this._controls, this._position, this._transform, style);
    }

    setStroke(stroke: Pen): OpenShapeBuilder {
        return new OpenShapeBuilder(
            this._controls, 
            this._position, 
            this._transform, 
            new OpenShapeStyle(stroke)
        );
    }

    build(): OpenShapeItem {
        return new OpenShapeItem(this._position, this._transform, this._controls, this._style);
    }
}