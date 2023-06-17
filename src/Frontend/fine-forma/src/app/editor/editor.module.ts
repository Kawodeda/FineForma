import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/editor-viewer.component';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';
import { SelectionService } from './toolbar/selection.service';
import { ToolbarComponent } from './toolbar/editor-toolbar.component';
import { SELECTION_SERVICE } from './toolbar/i-selection-service';
import { VIEWER_RENDERING_SERVICE } from './viewer/i-viewer-rendering-service';
import { ZOOM_SERVICE } from './toolbar/zoom-bar/i-zoom-service';
import { ZoomService } from './toolbar/zoom-bar/zoom.service';
import { SharedModule } from '../shared/shared.module';
import { ITEM_SERVICE } from './toolbar/i-item-service';
import { ItemService } from './toolbar/item.service';
import { ZoomBarComponent } from './toolbar/zoom-bar/zoom-bar.component';
import { INPUT_HANDLING_SERVICE } from './viewer/i-input-handling-service';
import { InputHandlingService } from './viewer/input-handling.service';
import { VIEWPORT_SERVICE } from './viewer/i-viewport-service';
import { ViewportService } from './viewer/viewport.service';
import { AppRoutingModule } from '../app-routing.module';
import { UserMenuComponent } from './toolbar/user-menu/user-menu.component';

@NgModule({
    imports: [SharedModule, MatButtonModule, MatToolbarModule, MatDividerModule, MatIconModule, MatMenuModule, MatTooltipModule, AppRoutingModule],
    exports: [EditorComponent],
    declarations: [EditorComponent, ViewerComponent, ToolbarComponent, ZoomBarComponent, UserMenuComponent],
    providers: [
        { provide: VIEWER_RENDERING_SERVICE, useClass: ViewerRenderingService },
        { provide: SELECTION_SERVICE, useClass: SelectionService },
        { provide: ZOOM_SERVICE, useClass: ZoomService },
        { provide: ITEM_SERVICE, useClass: ItemService },
        { provide: INPUT_HANDLING_SERVICE, useClass: InputHandlingService },
        { provide: VIEWPORT_SERVICE, useClass: ViewportService }
    ]
})
export class EditorModule { }