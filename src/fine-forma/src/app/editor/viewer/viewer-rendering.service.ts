import { Inject, Injectable } from '@angular/core';

import { IViewerRenderingService } from './i-viewer-rendering-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { RenderingContext } from './rendering-context';

@Injectable()
export class ViewerRenderingService implements IViewerRenderingService {

    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    redrawViewer(context: CanvasRenderingContext2D): void {
        context.resetTransform();
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        this._viewerProvider.viewer.renderer.render(
            new RenderingContext(context)
        );
    }
}