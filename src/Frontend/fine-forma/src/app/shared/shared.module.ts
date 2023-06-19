import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { NavigateBackDirective } from './navigate-back.directive';
import { ConfirmActionComponent } from './confirm-action/confirm-action.component';

@NgModule({
    declarations: [NavigateBackDirective, ConfirmActionComponent],
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        MatDialogModule,
        MatButtonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        NavigateBackDirective,
        ConfirmActionComponent
    ]
})
export class SharedModule {

}