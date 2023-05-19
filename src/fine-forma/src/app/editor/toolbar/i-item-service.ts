import { InjectionToken } from '@angular/core';

export const ITEM_SERVICE = new InjectionToken<IItemService>('item-service');

export interface IItemService {

    deleteSelectedItem(): Promise<void>;
}