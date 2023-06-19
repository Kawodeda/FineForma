import { Inject, Injectable } from '@angular/core';

import { Command, SetViewportConstraintsCommand, Vector2, ViewportConstraints } from 'fine-forma-core';

import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { IViewportService } from './i-viewport-service';

@Injectable()
export class ViewportService implements IViewportService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    async updateViewportSize(viewportWidth: number, viewportHeight: number): Promise<void> {
        const constraints = this._viewerProvider.viewer.viewport.constraints;
        if (constraints instanceof ViewportConstraints) {
            await this._viewerProvider.viewer.execute(
                new Command([], [
                    new SetViewportConstraintsCommand(new ViewportConstraints(
                        constraints.workarea,
                        constraints.workareaMargin,
                        constraints.minZoom,
                        constraints.maxZoom,
                        new Vector2(viewportWidth, viewportHeight)
                    ))
                ])
            );
        }
    }
}