import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'

import { LogInComponent } from './log-in.component';
import { SignUpComponent } from './sign-up.component';
import { LOG_IN_SERVICE } from './i-log-in-service';
import { LogInService } from './log-in.service';
import { SIGN_UP_SERVICE } from './i-sign-up-service';
import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule, CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatCardModule, AppRoutingModule],
    exports: [LogInComponent, SignUpComponent],
    declarations: [LogInComponent, SignUpComponent],
    providers: [
        { provide: LOG_IN_SERVICE, useClass: LogInService },
        { provide: SIGN_UP_SERVICE, useExisting: LOG_IN_SERVICE }
    ]
})
export class LogInModule {

}