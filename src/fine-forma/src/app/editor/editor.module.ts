import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/editor-viewer.component';
import { ViewerProvider } from './shared/viewer-provider.service';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';
import { SelectionService } from './toolbar/selection.service';
import { ToolbarComponent } from './toolbar/editor-toolbar.component';
import { SELECTION_SERVICE } from './toolbar/i-selection-service';
import { VIEWER_RENDERING_SERVICE } from './viewer/i-viewer-rendering-service';
import { VIEWER_PROVIDER } from './shared/i-viewer-provider';
import { ZOOM_SERVICE } from './toolbar/zoom-panel/i-zoom-service';
import { ZoomService } from './toolbar/zoom-panel/zoom.service';
import { SharedModule } from '../shared/shared.module';
import { ITEM_SERVICE } from './toolbar/i-item-service';
import { ItemService } from './toolbar/item.service';
import { ZoomPanelComponent } from './toolbar/zoom-panel/zoom-panel.component';

@NgModule({
    imports: [SharedModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatIconModule, MatMenuModule],
    exports: [EditorComponent],
    declarations: [EditorComponent, ViewerComponent, ToolbarComponent, ZoomPanelComponent],
    providers: [
        { provide: VIEWER_PROVIDER, useClass: ViewerProvider },
        { provide: VIEWER_RENDERING_SERVICE, useClass: ViewerRenderingService },
        { provide: SELECTION_SERVICE, useClass: SelectionService },
        { provide: ZOOM_SERVICE, useClass: ZoomService },
        { provide: ITEM_SERVICE, useClass: ItemService }
    ]
})
export class EditorModule { }