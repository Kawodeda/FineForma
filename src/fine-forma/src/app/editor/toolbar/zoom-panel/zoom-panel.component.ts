import { Component, Inject, Input } from '@angular/core';

import { IZoomService, ZOOM_SERVICE } from './i-zoom-service';

const ZOOM_STEP = 0.2;

@Component({
    selector: 'ff-editor-zoom-panel',
    templateUrl: 'zoom-panel.component.html',
    styleUrls: ['zoom-panel.component.scss']
})
export class ZoomPanelComponent {
    
    @Input() viewerWidth = 0;
    @Input() viewerHeight = 0;

    private readonly _zoomService: IZoomService;
    
    constructor(@Inject(ZOOM_SERVICE) zoomService: IZoomService) {
        this._zoomService = zoomService;
    }

    get zoom(): number {
        return this._zoomService.zoom;
    }

    get canZoomIn(): boolean {
        return this._zoomService.canIncreaseZoomBy(ZOOM_STEP);
    }

    get canZoomOut(): boolean {
        return this._zoomService.canDecreaseZoomBy(ZOOM_STEP);
    }

    async onZoomInClick(): Promise<void> {
        await this._zoomService.increaseZoom(ZOOM_STEP, this.viewerWidth, this.viewerHeight);
    }

    async onZoomOutClick():  Promise<void> {
        await this._zoomService.decreaseZoom(ZOOM_STEP, this.viewerWidth, this.viewerHeight);
    }
}