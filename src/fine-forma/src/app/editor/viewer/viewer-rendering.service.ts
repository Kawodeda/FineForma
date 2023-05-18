import { Injectable } from '@angular/core';

import { ViewerProvider } from '../shared/viewer-provider.service';
import { RenderingContext } from './rendering-context';

@Injectable()
export class ViewerRenderingService {

    private readonly _viewerProvider: ViewerProvider;

    constructor(viewerProvider: ViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    renderOn(context: CanvasRenderingContext2D): void {
        this._viewerProvider.viewer.renderer.render(
            new RenderingContext(context)
        );
    }
}