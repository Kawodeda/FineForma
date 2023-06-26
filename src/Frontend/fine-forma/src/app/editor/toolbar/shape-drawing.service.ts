import { Inject, Injectable } from '@angular/core';
import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';

@Injectable()
export class ShapeDrawingService {

    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    startDrawing(): void {
        this._viewerProvider.shapeDrawingInputHandler.startDrawing();
    }
}