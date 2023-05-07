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

    private _drawImage(context: IRenderingContext, imageContent: ImageContent): void {
        context.drawImage(
            Uint8ClampedArray.from(imageContent.image), 
            this._item.position.x, 
            this._item.position.y,
            this._item.rectangle.width,
            this._item.rectangle.height);
    }
}