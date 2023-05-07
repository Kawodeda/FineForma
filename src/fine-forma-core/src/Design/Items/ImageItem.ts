import { Vector2 } from '../../Math';
import { RectangleControls } from './Controls/RectangleControls';
import { Item } from './Item';
import { ImageStyle } from './Style/ImageStyle';
import { Transform } from '../../Transform';
import { IShapeControls } from './Interfaces/IShapeControls';
import { IItemStyle } from './Interfaces/IItemStyle';

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

    override get style(): IItemStyle {
        return this._style;
    }
}