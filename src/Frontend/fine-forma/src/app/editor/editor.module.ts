import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { DesignsClient, IApiClient } from 'fine-forma-api-clients';

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/editor-viewer.component';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';
import { SelectionService } from './toolbar/selection.service';
import { EditorToolbarComponent } from './toolbar/editor-toolbar.component';
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
import { UserMenuComponent } from './app-toolbar/user-menu/user-menu.component';
import { AppRoutingModule } from '../app-routing.module';
import { AppToolbarComponent } from './app-toolbar/app-toolbar.component';
import { DesignManagerComponent } from './design-manager/design-manager.component';
import { DESIGNS_CLIENT } from './design-manager/designs-client-token';
import { DESIGN_MANAGER } from './design-manager/i-design-manager';
import { DesignManager } from './design-manager/design-manager.service';
import { DesignCardComponent } from './design-manager/design-card/design-card.component';
import { API_CLIENT } from '../shared/api-client-token';
import { SaveDesignComponent } from './app-toolbar/save-design-dialog/save-design.component';
import { ColorPickerComponent } from './toolbar/color-picker/color-picker.component';
import { ITEM_STYLE_SERVICE } from './toolbar/i-item-style-service';
import { ItemStyleService } from './toolbar/item-style.service';
import { SHAPE_DRAWING_SERVICE } from './toolbar/i-shape-drawing-service';
import { ShapeDrawingService } from './toolbar/shape-drawing.service';

@NgModule({
    imports: [
        SharedModule, 
        MatButtonModule, 
        MatToolbarModule, 
        MatDividerModule, 
        MatIconModule, 
        MatMenuModule, 
        MatTooltipModule, 
        AppRoutingModule,
        MatDialogModule,
        MatCardModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatInputModule,
        MatSliderModule,
        MatCheckboxModule
    ],
    exports: [EditorComponent],
    declarations: [
        EditorComponent, 
        ViewerComponent, 
        EditorToolbarComponent, 
        ZoomBarComponent, 
        UserMenuComponent, 
        AppToolbarComponent,
        DesignManagerComponent,
        DesignCardComponent,
        SaveDesignComponent,
        ColorPickerComponent
    ],
    providers: [
        { provide: VIEWER_RENDERING_SERVICE, useClass: ViewerRenderingService },
        { provide: SELECTION_SERVICE, useClass: SelectionService },
        { provide: ZOOM_SERVICE, useClass: ZoomService },
        { provide: ITEM_SERVICE, useClass: ItemService },
        { provide: INPUT_HANDLING_SERVICE, useClass: InputHandlingService },
        { provide: VIEWPORT_SERVICE, useClass: ViewportService },
        { provide: DESIGNS_CLIENT, useFactory: (apiClient: IApiClient) => new DesignsClient(apiClient), deps: [API_CLIENT] },
        { provide: DESIGN_MANAGER, useClass: DesignManager },
        { provide: ITEM_STYLE_SERVICE, useClass: ItemStyleService },
        { provide: SHAPE_DRAWING_SERVICE, useClass: ShapeDrawingService }
    ]
})
export class EditorModule { }