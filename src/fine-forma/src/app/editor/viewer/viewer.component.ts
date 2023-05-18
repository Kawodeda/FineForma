import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

import { ViewerRenderingService } from './viewer-rendering.service';

@Component({
  selector: 'ff-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerComponent implements AfterViewInit {

    @ViewChild('mainCanvas') canvas: ElementRef<HTMLCanvasElement> | undefined;

    private readonly _renderingService: ViewerRenderingService;

    constructor(renderingService: ViewerRenderingService) {
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
        this._renderingService.renderOn(this._context);
    }
}