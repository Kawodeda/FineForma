import { IRgbColor } from './rgb-color';
import { InjectionToken } from '@angular/core';

export const ITEM_STYLE_SERVICE = new InjectionToken<IItemStyleService>('item-style-service');

export interface IItemStyleService {

    get hasFillColor(): boolean;

    get hasBorder(): boolean;

    get fillColor(): IRgbColor;

    get borderColor(): IRgbColor;

    get borderWidth(): number;

    get hasDashes(): boolean;

    setFillColor(fillColor: IRgbColor): Promise<void>;

    setBorderColor(borderColor: IRgbColor): Promise<void>;

    setBorderWidth(borderWidth: number): Promise<void>;

    toggleDashes(): Promise<void>;
}