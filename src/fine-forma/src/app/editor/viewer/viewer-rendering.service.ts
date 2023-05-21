import { Inject, Injectable } from '@angular/core';

import { IViewerRenderingService } from './i-viewer-rendering-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { IImageBitmapProvider, IMAGE_BITMAP_PROVIDER } from '../../shared/i-image-bitmap-provider';
import { RenderingContext } from './rendering-context';

@Injectable()
export class ViewerRenderingService implements IViewerRenderingService {

    private readonly _viewerProvider: IViewerProvider;
    private readonly _imageBitmapProvider: IImageBitmapProvider;

    constructor(
        @Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider,
        @Inject(IMAGE_BITMAP_PROVIDER) imageBitmapProvider: IImageBitmapProvider) {
        this._viewerProvider = viewerProvider;
        this._imageBitmapProvider = imageBitmapProvider;
    }
    
    redrawViewer(context: CanvasRenderingContext2D): void {
        context.resetTransform();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        this._viewerProvider.viewer.renderer.render(
            new RenderingContext(context, this._imageBitmapProvider)
        );
    }
}