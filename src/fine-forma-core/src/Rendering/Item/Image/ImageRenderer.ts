import { ImageItem } from '../../../Design';
import { IRenderingContext } from '../../IRenderingContext';
import { BaseItemRenderer } from '../BaseItemRenderer';
import { IImageContentProvider } from './IImageContentProvider';
import { ImageContent } from './ImageContent';

export class ImageRenderer extends BaseItemRenderer {

    protected override readonly _item: ImageItem;
    private readonly _imageContentProvider: IImageContentProvider;

    constructor(item: ImageItem, imageContentProvider: IImageContentProvider) {
        super(item);

        this._item = item;
        this._imageContentProvider = imageContentProvider;
    }

    protected override _renderItem(context: IRenderingContext): void {
        this._imageContentProvider.getContent(this._item.storageId)
            .caseOf({
                just: imageContent => this._drawImage(context, imageContent),

                // TODO: add preloader drawing
                nothing: () => void 0
            });
    }

    // TODO: implement image flip when its rectangle is flipped
    private _drawImage(context: IRenderingContext, imageContent: ImageContent): void {
        context.drawImage(
            Uint8ClampedArray.from(imageContent.image), 
            this._item.controls.path.bounds.corner1.x, 
            this._item.controls.path.bounds.corner1.y,
            this._item.controls.path.bounds.width,
            this._item.controls.path.bounds.height);
    }
}