import { ImageContent } from '../Rendering/Item/Image/ImageContent';

export interface IImageContentStorage {

    getImageContent(storageId: string): Promise<ImageContent>;
}