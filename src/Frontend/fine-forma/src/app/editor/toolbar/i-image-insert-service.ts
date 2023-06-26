import { InjectionToken } from '@angular/core';

export const IMAGE_INSERT_SERVICE = new InjectionToken<IImageInsertService>('image-insert-service');

export interface IImageInsertService {

    insertImage(image: File, x: number, y: number): Promise<void>;
}