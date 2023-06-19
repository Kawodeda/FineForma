import { Vector2 } from '../../Math';
import { RectangleControls } from './Controls/RectangleControls';
import { Item } from './Item';
import { ImageStyle } from './Style/ImageStyle';
import { Transform } from '../../Transform';
import { IShapeControls } from './Interfaces/IShapeControls';
import { Brush, Pen } from '../../Style';

export class ImageItem extends Item {

    private readonly _controls: RectangleControls;
    private readonly _style: ImageStyle;
    private readonly _storageId: string;

    constructor(
        position: Vector2,
        transform: Transform,
        controls: RectangleControls,
        style: ImageStyle,
        storageId: string) {
            super(position, transform);

            this._controls = controls;
            this._style = style;
            this._storageId = storageId;
        }
    
    get storageId(): string {
        return this._storageId;
    }

    get rectangle(): RectangleControls {
        return this._controls;
    }

    override get controls(): IShapeControls {
        return {
            path: this._controls.closedPath
        };
    }

    override get style(): ImageStyle {
        return this._style;
    }

    get strokeStyle(): Pen {
        return this._style.border;
    }

    get fillStyle(): Brush {
        return this._style.fill;
    }

    override equals(other: ImageItem): boolean {
        return super.equals(other)
            && this.storageId === other.storageId;
    }

    override setPosition(position: Vector2): Item {
        return new ImageItem(
            position,
            this.transform,
            this._controls,
            this._style,
            this.storageId
        );
    }

    override setTransform(transform: Transform): Item {
        return new ImageItem(
            this.position,
            transform,
            this._controls,
            this._style,
            this.storageId
        );
    }

    override transformControls(transform: Transform): ImageItem {
        return new ImageItem(
            this.position,
            this.transform,
            this._controls.transform(transform),
            this._style,
            this.storageId
        );
    }

    setStrokeStyle(stroke: Pen): ImageItem {
        return new ImageItem(
            this.position,
            this.transform,
            this._controls,
            this._style.setBorder(stroke),
            this.storageId
        );
    }

    setFillStyle(fill: Brush): ImageItem {
        return new ImageItem(
            this.position,
            this.transform,
            this._controls,
            this._style.setFill(fill),
            this.storageId
        );
    }
}