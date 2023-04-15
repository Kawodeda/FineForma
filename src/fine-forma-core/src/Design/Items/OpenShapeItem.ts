import { Vector2 } from '../../Math';
import { Transform } from '../../Transform';
import { IItemStyle } from './Interfaces/IItemStyle';
import { IOpenShapeControls } from './Interfaces/IOpenShapeControls';
import { IShapeControls } from './Interfaces/IShapeControls';
import { Item } from './Item';
import { OpenShapeStyle } from './Style/OpenShapeStyle';

export class OpenShapeItem extends Item {

    private readonly _controls: IOpenShapeControls;
    private readonly _style: OpenShapeStyle;

    constructor(position: Vector2, transform: Transform, controls: IOpenShapeControls, style: OpenShapeStyle) {
        super(position, transform);

        this._controls = controls;
        this._style = style;
    }

    override get controls(): IShapeControls {
        return { 
            path: this._controls.openPath
        };
    }

    override get style(): IItemStyle {
        return this._style;
    }
}