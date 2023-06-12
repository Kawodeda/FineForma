import { ImageItem, Item } from '../../Design';
import { IItemRenderer } from './IItemRenderer';
import { IImageContentProvider } from './Image/IImageContentProvider';
import { ImageRenderer } from './Image/ImageRenderer';
import { ShapeRenderer } from './ShapeRenderer';

const IS_IMAGE_ITEM = (item: Item): item is ImageItem => item instanceof ImageItem;

export class ItemRendererFactory {

    private readonly _imageContentProvider: IImageContentProvider;

    constructor(imageContentProvider: IImageContentProvider) {
        this._imageContentProvider = imageContentProvider;
    }

    createFor(item: Item): IItemRenderer {
        if (IS_IMAGE_ITEM(item)) {
            return this._createImageItemRenderer(item);
        }

        return new ShapeRenderer(item);
    }

    private _createImageItemRenderer(item: ImageItem): IItemRenderer {
        return new ShapeRenderer(
            item, 
            new ImageRenderer(item, this._imageContentProvider));
    }
}