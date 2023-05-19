import { Component, ElementRef, ViewChild, AfterViewInit, Inject } from '@angular/core';

import { IViewerRenderingService, VIEWER_RENDERING_SERVICE } from './i-viewer-rendering-service';

@Component({
  selector: 'ff-editor-viewer',
  templateUrl: './editor-viewer.component.html',
  styleUrls: ['./editor-viewer.component.scss']
})
export class ViewerComponent implements AfterViewInit {

    @ViewChild('mainCanvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

    private readonly _renderingService: IViewerRenderingService;

    constructor(@Inject(VIEWER_RENDERING_SERVICE) renderingService: IViewerRenderingService) {
        this._renderingService = renderingService;
    }

    private get _context(): CanvasRenderingContext2D {
        const ctx = this.canvas?.nativeElement.getContext('2d');
        if(ctx == null) {
            throw new Error('Unable to get canvas rendering context');
        }

        return ctx;
    }

    ngAfterViewInit(): void {
        const redrawViewer = () => {
            this._renderingService.redrawViewer(this._context);

            requestAnimationFrame(redrawViewer);
        }

        redrawViewer();
    }
}