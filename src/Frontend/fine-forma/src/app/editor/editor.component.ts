import { Component } from '@angular/core';

@Component({
    selector: 'ff-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})

export class EditorComponent {
    
    private _viewerWidth = 300;
    private _viewerHeight = 150;

    get viewerWidth(): number {
        return this._viewerWidth;
    }

    get viewerHeight(): number {
        return this._viewerHeight;
    }

    onViewerWidthChanged(width: number): void {
        this._viewerWidth = width;
        console.log('editor', this._viewerWidth);
    }

    onViewerHeightChanged(height: number): void {
        this._viewerHeight = height;
        console.log('editor', this._viewerHeight);
    }
}