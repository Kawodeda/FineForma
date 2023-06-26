import { Inject, Injectable } from '@angular/core';

import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { IShapeDrawingService } from './i-shape-drawing-service';

@Injectable()
export class ShapeDrawingService implements IShapeDrawingService {

    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    get isDrawing(): boolean {
        return this._viewerProvider.shapeDrawingInputHandler.isDrawing;
    }

    startDrawing(): void {
        this._viewerProvider.shapeDrawingInputHandler.startDrawing();
    }
}