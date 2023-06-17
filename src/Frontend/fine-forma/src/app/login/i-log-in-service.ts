import { InjectionToken } from '@angular/core';

import { AuthenticationResult } from './authentication-result';

export const LOG_IN_SERVICE = new InjectionToken<ILogInService>('log-in-service');

export interface ILogInService {

    logIn(username: string, password: string): Promise<AuthenticationResult>;

    logOut(): Promise<void>;
}