import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ILogInService, LOG_IN_SERVICE } from './i-log-in-service';
import { AuthenticationResult, isSuccess } from './authentication-result';

@Component({
  selector: 'ff-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
    private readonly _router: Router;
    private readonly _logInService: ILogInService;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _usernameControl = new FormControl('', [Validators.required]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _passwordControl = new FormControl('', [Validators.required]);
    private readonly _loginForm = new FormGroup({
        username: this._usernameControl,
        password: this._passwordControl
    });

    private _statusMessage = '';

    constructor(router: Router, @Inject(LOG_IN_SERVICE) logInService: ILogInService) {
        this._router = router;
        this._logInService = logInService;
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
        const username = this.usernameControl.value as string;
        const password = this.passwordControl.value as string;

        this._logInService.logIn(username, password)
            .then(result => this._processAuthentication(result))
            .catch(error => console.error(error))
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