import { InjectionToken } from '@angular/core';

import { AuthenticationResult } from './authentication-result';

export const SIGN_UP_SERVICE = new InjectionToken<ISignUpService>('sign-up-service');

export interface ISignUpService {

    signUp(username: string, password: string): Promise<AuthenticationResult>;
}