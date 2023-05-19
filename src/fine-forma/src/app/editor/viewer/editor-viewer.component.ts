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
    private readonly _canvasResizeObserver: ResizeObserver;

    constructor(@Inject(VIEWER_RENDERING_SERVICE) renderingService: IViewerRenderingService) {
        this._renderingService = renderingService;
        this._canvasResizeObserver = new ResizeObserver(entries => this._onCanvasResized(entries));
    }

    private get _canvas(): HTMLCanvasElement {
        if (this.canvas?.nativeElement == null) {
            throw new Error('Unable to get canvas');
        }

        return this.canvas.nativeElement;
    }

    private get _context(): CanvasRenderingContext2D {
        const ctx = this._canvas.getContext('2d');
        if (ctx == null) {
            throw new Error('Unable to get canvas rendering context');
        }

        return ctx;
    }

    ngAfterViewInit(): void {
        const redrawViewer = (): void => {
            this._renderingService.redrawViewer(this._context);

            requestAnimationFrame(redrawViewer);
        }

        this._canvasResizeObserver.observe(this._canvas, { box: 'content-box' });
        redrawViewer();
    }

    private _onCanvasResized(entries: ResizeObserverEntry[]): void {
        const canvas = entries[0];
        if (canvas == null || canvas.contentBoxSize[0] == null) {
            throw new Error('Canvas resize processing falied');
        }

        this._setCanvasSize(
            canvas.contentBoxSize[0].inlineSize, 
            canvas.contentBoxSize[0].blockSize
        );
    }

    private _setCanvasSize(width: number, height: number): void {
        this._canvas.width = width;
        this._canvas.height = height;
    }
}