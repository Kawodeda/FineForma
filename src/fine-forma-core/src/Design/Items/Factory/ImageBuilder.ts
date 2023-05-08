import { Vector2 } from '../../../Math';
import { Brush, Pen } from '../../../Style';
import { Transform } from '../../../Transform';
import { RectangleControls } from '../Controls';
import { ImageItem } from '../ImageItem';
import { ImageStyle } from '../Style';

export class ImageBuilder {

    private readonly _storageId: string;
    private readonly _controls: RectangleControls;
    private readonly _position: Vector2;
    private readonly _transform: Transform;
    private readonly _style: ImageStyle;

    constructor(
        storageId: string,
        controls: RectangleControls, 
        position: Vector2 = Vector2.zero, 
        transform: Transform = Transform.createIdentity(), 
        style: ImageStyle = ImageBuilder._defaultStyle) {
            this._storageId = storageId;
        this._controls = controls;
        this._position = position;
        this._transform = transform;
        this._style = style;
    }

    private static get _defaultStyle(): ImageStyle {
        return new ImageStyle();
    }

    setStorageId(storageId: string): ImageBuilder {
        return new ImageBuilder(storageId, this._controls, this._position, this._transform, this._style);
    }

    setRectangle(rectangle: RectangleControls): ImageBuilder {
        return new ImageBuilder(this._storageId, rectangle, this._position, this._transform, this._style);
    }

    setPosition(position: Vector2): ImageBuilder {
        return new ImageBuilder(this._storageId, this._controls, position, this._transform, this._style);
    }

    setTransform(transform: Transform): ImageBuilder {
        return new ImageBuilder(this._storageId, this._controls, this._position, transform, this._style);
    }

    setStyle(style: ImageStyle): ImageBuilder {
        return new ImageBuilder(this._storageId, this._controls, this._position, this._transform, style);
    }

    setBorder(border: Pen): ImageBuilder {
        return new ImageBuilder(
            this._storageId,
            this._controls, 
            this._position, 
            this._transform, 
            new ImageStyle(border, this._style.fill)
        );
    }

    setFill(fill: Brush): ImageBuilder {
        return new ImageBuilder(
            this._storageId,
            this._controls, 
            this._position, 
            this._transform, 
            new ImageStyle(this._style.border, fill)
        );
    }

    build(): ImageItem {
        return new ImageItem(this._position, this._transform, this._controls, this._style, this._storageId);
    }
}