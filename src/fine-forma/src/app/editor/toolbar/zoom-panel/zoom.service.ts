import { Inject, Injectable } from '@angular/core';

import { AddZoomAtCommand, Command, Vector2 } from 'fine-forma-core';

import { IZoomService } from './i-zoom-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { canvasToDesignPoint } from '../../shared/reference-frame-converter';

@Injectable()
export class ZoomService implements IZoomService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    get zoom(): number {
        return this._viewerProvider.viewer.viewport.zoom;
    }

    canIncreaseZoomBy(amount: number): boolean {
        const increasedZoom = this.zoom + amount;

        return this._isValidZoom(increasedZoom);
    }

    canDecreaseZoomBy(amount: number): boolean {
        const decreasedZoom = this.zoom - amount;

        return this._isValidZoom(decreasedZoom);
    }

    increaseZoom(amount: number, viewerWidth: number, viewerHeight: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([], [
            new AddZoomAtCommand(amount, this._getZoomCenter(viewerWidth, viewerHeight))
        ]));
    }

    decreaseZoom(amount: number, viewerWidth: number, viewerHeight: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([], [
            new AddZoomAtCommand(-amount, this._getZoomCenter(viewerWidth, viewerHeight))
        ]));
    }

    private _isValidZoom(zoom: number): boolean {
        return this._viewerProvider.viewer.viewport.constraints.isValidZoom(zoom);
    }

    private _getZoomCenter(viewerWidth: number, viewerHeight: number): Vector2 {
        return canvasToDesignPoint(
            new Vector2(viewerWidth / 2, viewerHeight / 2), 
            this._viewerProvider.viewer.viewport
        );
    }
}