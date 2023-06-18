import { Component, Inject } from '@angular/core';

import { IUserService, USER_SERVICE } from '../../shared/i-user-service';

@Component({
    selector: 'ff-app-toolbar',
    templateUrl: 'app-toolbar.component.html',
    styleUrls: ['app-toolbar.component.scss']
})

export class AppToolbarComponent {

    private readonly _userService: IUserService;

    constructor(@Inject(USER_SERVICE) userService: IUserService) {
        this._userService = userService;
    }

    get userAuthorized(): boolean {
        return this._userService.isAuthorized;
    }

    get unauthorizedMenuMessage(): string { 
        return 'Sign in your account to access this';
    }
}