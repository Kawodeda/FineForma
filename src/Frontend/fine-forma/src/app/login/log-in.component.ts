import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationResult, IAuthenticationClient, isSuccess } from 'fine-forma-api-clients';

import { AUTHENTICATION_CLIENT } from './authentication-client-token';

@Component({
  selector: 'ff-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
    private readonly _location: Location;
    private readonly _router: Router;
    private readonly _authenticationClient: IAuthenticationClient;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _usernameControl = new FormControl('', [Validators.required]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _passwordControl = new FormControl('', [Validators.required]);
    private readonly _loginForm = new FormGroup({
        username: this._usernameControl,
        password: this._passwordControl
    });

    private _statusMessage = '';

    constructor(location: Location, router: Router, @Inject(AUTHENTICATION_CLIENT) authenticationClient: IAuthenticationClient) {
        this._location = location;
        this._router = router;
        this._authenticationClient = authenticationClient;
    }

    get usernameControl(): FormControl {
        return this._usernameControl;
    }

    get passwordControl(): FormControl {
        return this._passwordControl;
    }

    get loginForm(): FormGroup {
        return this._loginForm;
    }

    get statusMessage(): string {
        return this._statusMessage;
    }

    submit(): void {
        const user = {
            username: this.usernameControl.value as string,
            password: this.passwordControl.value as string
        };
        this._authenticationClient.logIn(user)
            .then(result => this._processAuthentication(result))
            .catch(error => console.error(error))
    }

    navigateBack(): void {
        this._location.back();
    }

    private _processAuthentication(result: AuthenticationResult): void {
        if (isSuccess(result)) {
            this._statusMessage = '';
            this._router.navigate(['/editor'])
                .catch(() => console.error('failed to redirect to editor'));
        }
        else {
            this._statusMessage = result.message;
        }
    }
}
