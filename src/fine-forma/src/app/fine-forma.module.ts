import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FineFormaRoutingModule } from './fine-forma-routing.module';
import { FineFormaComponent } from './fine-forma.component';
import { EditorModule } from './editor/editor.module';

@NgModule({
    declarations: [
        FineFormaComponent
    ],
    imports: [
        BrowserModule,
        FineFormaRoutingModule,
        EditorModule
    ],
    providers: [],
    bootstrap: [FineFormaComponent]
})
export class FineFormaModule { }