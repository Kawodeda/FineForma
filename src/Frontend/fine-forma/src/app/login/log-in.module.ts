import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthenticationClient, IApiClient } from 'fine-forma-api-clients';

import { LogInComponent } from './log-in.component';
import { SignUpComponent } from './sign-up.component';
import { AUTHENTICATION_CLIENT } from './authentication-client-token';
import { REGISTRATION_CLIENT } from './registration-client-token';
import { API_CLIENT } from '../shared/api-client-token';

@NgModule({
    imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule],
    exports: [LogInComponent, SignUpComponent],
    declarations: [LogInComponent, SignUpComponent],
    providers: [
        { provide: AUTHENTICATION_CLIENT, useFactory: (apiClient: IApiClient) => new AuthenticationClient(apiClient), deps: [API_CLIENT] },
        { provide: REGISTRATION_CLIENT, useExisting: AUTHENTICATION_CLIENT }
    ]
})
export class LogInModule {

}
