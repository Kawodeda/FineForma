import { InjectionToken } from '@angular/core';

export const VIEWER_RENDERING_SERVICE = new InjectionToken<IViewerRenderingService>('viewer-rendering-service');

export interface IViewerRenderingService {

    redrawViewer(context: CanvasRenderingContext2D): void;
}