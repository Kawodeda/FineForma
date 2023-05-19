import { Inject, Injectable } from '@angular/core';

import { AddZoomCommand, Command, nearlyEquals } from 'fine-forma-core';

import { IZoomService } from './i-zoom-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';

@Injectable()
export class ZoomService implements IZoomService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    get zoom(): number {
        return this._viewerProvider.viewer.viewport.zoom;
    }

    private get _maxZoom(): number {
        return this._viewerProvider.viewer.viewport.constraints.maxZoom;
    }

    private get _minZoom(): number {
        return this._viewerProvider.viewer.viewport.constraints.minZoom;
    }

    canIncreaseZoomBy(amount: number): boolean {
        const increasedZoom = this.zoom + amount;

        return increasedZoom < this._maxZoom
            || nearlyEquals(increasedZoom, this._maxZoom);
    }

    canDecreaseZoomBy(amount: number): boolean {
        const decreasedZoom = this.zoom - amount;

        return decreasedZoom > this._minZoom
            || nearlyEquals(decreasedZoom, this._minZoom);
    }

    increaseZoom(amount: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([], [
            new AddZoomCommand(amount)
        ]));
    }

    decreaseZoom(amount: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([], [
            new AddZoomCommand(-amount)
        ]));
    }
}