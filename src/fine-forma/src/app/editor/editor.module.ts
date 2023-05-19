import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/editor-viewer.component';
import { ViewerProvider } from './shared/viewer-provider.service';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';
import { SelectionService } from './toolbar/selection.service';
import { ToolbarComponent } from './toolbar/editor-toolbar.component';
import { SELECTION_SERVICE } from './toolbar/i-selection-service';
import { VIEWER_RENDERING_SERVICE } from './viewer/i-viewer-rendering-service';
import { VIEWER_PROVIDER } from './shared/i-viewer-provider';
import { ZOOM_SERVICE } from './toolbar/i-zoom-service';
import { ZoomService } from './toolbar/zoom.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatIconModule],
    exports: [EditorComponent],
    declarations: [EditorComponent, ViewerComponent, ToolbarComponent],
    providers: [
        { provide: VIEWER_PROVIDER, useClass: ViewerProvider },
        { provide: VIEWER_RENDERING_SERVICE, useClass: ViewerRenderingService },
        { provide: SELECTION_SERVICE, useClass: SelectionService },
        { provide: ZOOM_SERVICE, useClass: ZoomService }
    ]
})
export class EditorModule { }