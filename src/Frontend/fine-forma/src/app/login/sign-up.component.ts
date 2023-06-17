import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

import { ISignUpService, SIGN_UP_SERVICE } from './i-sign-up-service';
import { AuthenticationResult, isSuccess } from './authentication-result';
import { ILogInService, LOG_IN_SERVICE } from './i-log-in-service';

@Component({
    selector: 'ff-sign-up',
    templateUrl: 'sign-up.component.html',
    styleUrls: ['sign-up.component.scss']
})
export class SignUpComponent {

    private readonly _signUpService: ISignUpService;
    private readonly _logInService: ILogInService;
    private readonly _router: Router;
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _usernameControl = new FormControl('', [Validators.required]);
    // eslint-disable-next-line @typescript-eslint/unbound-method
    private readonly _passwordControl = new FormControl('', [Validators.required]);
    private readonly _confirmPasswordControl = new FormControl('', [control => this._confirmPasswordValidator(control)]);
    private readonly _signupForm = new FormGroup({
        username: this._usernameControl,
        password: this._passwordControl,
        confirmPassword: this._confirmPasswordControl
    });

    private _statusMessage = '';

    constructor(
        @Inject(SIGN_UP_SERVICE) signUpService: ISignUpService,
        @Inject(LOG_IN_SERVICE) logInService: ILogInService, 
        router: Router
    ) {
        this._signUpService = signUpService;
        this._logInService = logInService;
        this._router = router;

        this.passwordControl.valueChanges.subscribe(() => this._onPasswordChange());
    }

    get usernameControl(): FormControl {
        return this._usernameControl;
    }

    get passwordControl(): FormControl {
        return this._passwordControl;
    }

    get confirmPasswordControl(): FormControl {
        return this._confirmPasswordControl;
    }

    get signupForm(): FormGroup {
        return this._signupForm;
    }

    get statusMessage(): string {
        return this._statusMessage;
    }

    submit(): void {
        const username = this.usernameControl.value as string;
        const password = this.passwordControl.value as string;

        this._signUpService.signUp(username, password)
            .then(result => this._processSignUpResult(result, username, password))
            .catch(error => console.error(error))
    }

    private _processSignUpResult(result: AuthenticationResult, username: string, password: string): void {
        if (isSuccess(result)) {
            this._statusMessage = '';
            this._logInService.logIn(username, password)
                .then(() => this._router.navigate(['/editor']))
                .catch(error => console.error(error));
        }
        else {
            this._statusMessage = result.message;
        }
    }

    private _onPasswordChange(): void {
        this.confirmPasswordControl.updateValueAndValidity();
    }

    private _confirmPasswordValidator(control: AbstractControl): ValidationErrors {
        if (control.value === this._passwordControl.value) {
            return {};
        }

        return {
            passwordNotSame: true
        }
    }
}