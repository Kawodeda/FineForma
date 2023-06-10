import { InjectionToken } from '@angular/core';

export const ZOOM_SERVICE = new InjectionToken<IZoomService>('zoom-service');

export interface IZoomService {

    get zoom(): number;

    canIncreaseZoomBy(amount: number): boolean;

    canDecreaseZoomBy(amount: number): boolean;

    increaseZoom(amount: number, viewerWidth: number, viewerHeight: number): Promise<void>;

    decreaseZoom(amount: number, viewerWidth: number, viewerHeight: number): Promise<void>;
}