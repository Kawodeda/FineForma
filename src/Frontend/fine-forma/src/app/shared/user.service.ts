import { Inject, Injectable } from '@angular/core';

import { IUserClient, UserInfo } from 'fine-forma-api-clients';

import { IUser, IUserService } from './i-user-service';
import { USER_CLIENT } from './user-client-token';

@Injectable()
export class UserService implements IUserService {
    
    private readonly _userClient: IUserClient;

    private _isAuthorized = false;
    private _user: UserInfo | null = null;

    constructor(@Inject(USER_CLIENT) userClient: IUserClient) {
        this._userClient = userClient;
    }

    get isAuthorized(): boolean {
        return this._isAuthorized;
    }
    
    get user(): IUser | null {
        return this._user;
    }

    updateState(): void {
        this._userClient.isAuthenticated()
            .then(isAuthenticated => 
                this._isAuthorized = isAuthenticated)
            .then(() => 
                this.isAuthorized ? this._userClient.getUserInfo() : null)
            .then(
                userInfo => this._user = userInfo)
            .then(() =>
                console.log(this.isAuthorized, this.user))
            .catch(() => 
                console.log('failed to update state'));
    }
}