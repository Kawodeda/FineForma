import { InjectionToken } from '@angular/core';

export const ITEM_SERVICE = new InjectionToken<IItemService>('item-service');

export interface IItemService {

    deleteSelectedItem(): Promise<void>;

    insertRectangle(x: number, y: number): Promise<void>;

    insertCircle(x: number, y: number): Promise<void>;

    insertLine(x: number, y: number): Promise<void>;
}