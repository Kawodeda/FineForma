import { Maybe } from 'tsmonad';

import { ImageContent } from './ImageContent';

export interface IImageContentProvider {

    getContent(storageId: string): Maybe<ImageContent>;
}