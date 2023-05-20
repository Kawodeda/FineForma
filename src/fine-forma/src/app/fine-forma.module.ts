import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FineFormaRoutingModule } from './fine-forma-routing.module';
import { FineFormaComponent } from './fine-forma.component';
import { EditorModule } from './editor/editor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        FineFormaComponent
    ],
    imports: [
        BrowserModule,
        FineFormaRoutingModule,
        EditorModule,
        BrowserAnimationsModule,
        FontAwesomeModule
    ],
    providers: [],
    bootstrap: [FineFormaComponent]
})
export class FineFormaModule { }