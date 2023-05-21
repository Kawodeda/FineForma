import { InjectionToken } from '@angular/core';

import { ImageContent } from 'fine-forma-core';

export const IMAGE_BITMAP_PROVIDER = new InjectionToken<IImageBitmapProvider>('image-bitmap-provider');

export interface IImageBitmapProvider {

    getImageBitmap(imageContent: ImageContent): ImageBitmap | null;
}