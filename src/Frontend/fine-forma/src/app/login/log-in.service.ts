import { Inject, Injectable } from '@angular/core';

import { ILogInService } from './i-log-in-service';
import { AuthenticationResult, failure, success } from './authentication-result';
import { ISignUpService } from './i-sign-up-service';
import { AUTHENTICATION_CLIENT } from '../shared/authentication-client-token';
import { IUserService, USER_SERVICE } from '../shared/i-user-service';

import { BadRequest, IAuthenticationClient } from 'fine-forma-api-clients';

@Injectable()
export class LogInService implements ILogInService, ISignUpService {
    
    private readonly _authenticationClient: IAuthenticationClient;
    private readonly _userService: IUserService;

    constructor(
        @Inject(AUTHENTICATION_CLIENT) authenticationClient: IAuthenticationClient,
        @Inject(USER_SERVICE) userService: IUserService
    ) {
        this._authenticationClient = authenticationClient;
        this._userService = userService;
    }

    async logIn(username: string, password: string): Promise<AuthenticationResult> {
        try {
            await this._authenticationClient.logIn({ username: username, password: password });
            this._userService.updateState();

            return success();
        }
        catch (error) {
            if (BadRequest.isBadRequest(error)) {
                return failure(error.message);
            }

            throw error;
        }
    }
    
    logOut(): Promise<void> {
        return this._authenticationClient.logOut()
            .then(() => this._userService.updateState());
    }

    async signUp(username: string, password: string): Promise<AuthenticationResult> {
        try {
            await this._authenticationClient.signUp({ username: username, password: password });

            return success();
        }
        catch (error) {
            if (BadRequest.isBadRequest(error)) {
                return failure(error.message);
            }

            throw error;
        }
    }
}