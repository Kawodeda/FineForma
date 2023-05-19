import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button'

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/editor-viewer.component';
import { ViewerProvider } from './shared/viewer-provider.service';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';
import { SelectionService } from './toolbar/selection.service';
import { ToolbarComponent } from './toolbar/editor-toolbar.component';
import { SELECTION_SERVICE } from './toolbar/i-selection-service';
import { VIEWER_RENDERING_SERVICE } from './viewer/i-viewer-rendering-service';
import { VIEWER_PROVIDER } from './shared/i-viewer-provider';

@NgModule({
    imports: [MatButtonModule],
    exports: [EditorComponent],
    declarations: [EditorComponent, ViewerComponent, ToolbarComponent],
    providers: [
        { provide: VIEWER_PROVIDER, useClass: ViewerProvider },
        { provide: VIEWER_RENDERING_SERVICE, useClass: ViewerRenderingService },
        { provide: SELECTION_SERVICE, useClass: SelectionService }
    ]
})
export class EditorModule { }