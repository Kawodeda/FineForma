import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { IUserService, USER_SERVICE } from '../../shared/i-user-service';
import { DesignManagerComponent } from '../design-manager/design-manager.component';

@Component({
    selector: 'ff-app-toolbar',
    templateUrl: 'app-toolbar.component.html',
    styleUrls: ['app-toolbar.component.scss']
})

export class AppToolbarComponent {

    private readonly _userService: IUserService;
    private readonly _dialog: MatDialog;

    constructor(@Inject(USER_SERVICE) userService: IUserService, dialog: MatDialog) {
        this._userService = userService;
        this._dialog = dialog;
    }

    get userAuthorized(): boolean {
        return this._userService.isAuthorized;
    }

    get unauthorizedMenuMessage(): string { 
        return 'Sign in your account to access this';
    }

    openDesignManager(): void {
        this._dialog.open(DesignManagerComponent);
    }
}