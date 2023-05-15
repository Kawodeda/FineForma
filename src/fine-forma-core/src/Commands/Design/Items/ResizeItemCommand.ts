import { Design, Item, Layer } from '../../../Design';
import { Rectangle, Vector2 } from '../../../Math';
import { Transform } from '../../../Transform';
import { ItemCommand } from './ItemCommand';

export class ResizeItemCommand extends ItemCommand {
    
    private readonly _rectangle: Rectangle;

    constructor(item: Item, rectangle: Rectangle) {
        super(item);

        this._rectangle = rectangle;
    }

    override execute(design: Design): Promise<Design> {
        const resizedItem = this._item.transformControls(
            this._resizeTransform(this._item.controls.path.bounds.rectangle, this._rectangle)
        );
        const layer = design.getLayerOf(this._item);
        const newLayer = new Layer(
            layer.items.update(this._item, resizedItem), 
            layer.zIndex
        );

        return Promise.resolve(
            new Design(design.layers.update(layer, newLayer))
        );
    }

    private _resizeTransform(oldRectangle: Rectangle, newRectangle: Rectangle): Transform {
        const scale = new Vector2(
            newRectangle.width / oldRectangle.width,
            newRectangle.height / oldRectangle.height
        );
        const translate = new Vector2(
            (newRectangle.corner1.x / scale.x - oldRectangle.corner1.x) * scale.x,
            (newRectangle.corner1.y / scale.y - oldRectangle.corner1.y) * scale.y
        );

        return new Transform(translate, scale, 0);
    }
}