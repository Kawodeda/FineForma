import { InjectionToken } from '@angular/core';

export const SHAPE_DRAWING_SERVICE = new InjectionToken<IShapeDrawingService>('shape-drawing-service');

export interface IShapeDrawingService {
    
    startDrawing(): void;
}