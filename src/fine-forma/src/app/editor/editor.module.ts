import { NgModule } from '@angular/core';

import { EditorComponent } from './editor.component';
import { ViewerComponent } from './viewer/viewer.component';
import { ViewerProvider } from './shared/viewer-provider.service';
import { ViewerRenderingService } from './viewer/viewer-rendering.service';

@NgModule({
    imports: [],
    exports: [EditorComponent],
    declarations: [EditorComponent, ViewerComponent],
    providers: [
        { provide: ViewerProvider, useClass: ViewerProvider },
        { provide: ViewerRenderingService, useClass: ViewerRenderingService }
    ],
})
export class EditorModule { }