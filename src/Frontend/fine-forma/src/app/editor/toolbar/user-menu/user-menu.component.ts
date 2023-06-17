import { Component, Inject } from '@angular/core';

import { IUserService, USER_SERVICE } from '../../../shared/i-user-service';
import { ILogInService, LOG_IN_SERVICE } from '../../../login/i-log-in-service';
import { handleAsyncAction } from '../../../shared/utils';

@Component({
    selector: 'ff-user-menu',
    templateUrl: 'user-menu.component.html',
    styleUrls: ['user-menu.component.scss']
})
export class UserMenuComponent {

    private readonly _userService: IUserService;
    private readonly _logInService: ILogInService;
    
    constructor(
        @Inject(USER_SERVICE) userService: IUserService,
        @Inject(LOG_IN_SERVICE) logInService: ILogInService
    ) {
        this._userService = userService;
        this._logInService = logInService;
    }

    get userAuthorized(): boolean {
        return this._userService.isAuthorized;
    }

    get username(): string {
        return this._userService.user?.username ?? '';
    }

    logout(): void {
        handleAsyncAction(this._logInService.logOut());
    }
}