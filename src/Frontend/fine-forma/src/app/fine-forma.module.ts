import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FineFormaRoutingModule } from './fine-forma-routing.module';
import { FineFormaComponent } from './fine-forma.component';
import { EditorModule } from './editor/editor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IMAGE_BITMAP_PROVIDER } from './shared/i-image-bitmap-provider';
import { ImageBitmapProvider } from './shared/image-bitmap-provider';

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
    providers: [
        { provide: IMAGE_BITMAP_PROVIDER, useClass: ImageBitmapProvider }
    ],
    bootstrap: [FineFormaComponent]
})
export class FineFormaModule { }