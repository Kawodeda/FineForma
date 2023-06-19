import { IRgbColor } from './rgb-color';
import { InjectionToken } from '@angular/core';

export const ITEM_STYLE_SERVICE = new InjectionToken<IItemStyleService>('item-style-service');

export interface IItemStyleService {

    get hasFillColor(): boolean;

    get hasBorderColor(): boolean;

    get fillColor(): IRgbColor;

    get borderColor(): IRgbColor;

    setFillColor(fillColor: IRgbColor): Promise<void>;

    setBorderColor(borderColor: IRgbColor): Promise<void>;
}