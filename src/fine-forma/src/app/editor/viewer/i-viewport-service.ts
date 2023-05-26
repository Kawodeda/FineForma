import { InjectionToken } from '@angular/core';

export const VIEWPORT_SERVICE = new InjectionToken<IViewportService>('viewport-service');

export interface IViewportService {

    updateViewportSize(viewportWidth: number, viewportHeight: number): Promise<void>;
}