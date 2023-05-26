import { Inject, Injectable } from '@angular/core';

import { Command, SetViewportSizeCommand, Vector2 } from 'fine-forma-core';

import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { IViewportService } from './i-viewport-service';
import { canvasToDesignSize } from '../shared/reference-frame-converter';

@Injectable()
export class ViewportService implements IViewportService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    updateViewportSize(viewportWidth: number, viewportHeight: number): Promise<void> {
        return this._viewerProvider.viewer.execute(
            new Command([], [
                new SetViewportSizeCommand(canvasToDesignSize(
                    new Vector2(viewportWidth, viewportHeight), 
                    this._viewerProvider.viewer.viewport
                ))
            ])
        );
    }
}