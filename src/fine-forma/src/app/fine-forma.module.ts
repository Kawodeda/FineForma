import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FineFormaRoutingModule } from './fine-forma-routing.module';
import { FineFormaComponent } from './fine-forma.component';

@NgModule({
    declarations: [
        FineFormaComponent
    ],
    imports: [
        BrowserModule,
        FineFormaRoutingModule
    ],
    providers: [],
    bootstrap: [FineFormaComponent]
})
export class FineFormaModule { }
