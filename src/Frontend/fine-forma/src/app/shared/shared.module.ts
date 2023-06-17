import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { NavigateBackDirective } from './navigate-back.directive';

@NgModule({
    declarations: [NavigateBackDirective],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        NavigateBackDirective
    ]
})
export class SharedModule {

}