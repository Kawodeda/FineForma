import { Component, Inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { IUserService, USER_SERVICE } from '../../shared/i-user-service';
import { DesignManagerComponent } from '../design-manager/design-manager.component';
import { DESIGN_MANAGER, IDesignManager } from '../design-manager/i-design-manager';
import { SaveDesignComponent } from './save-design-dialog/save-design.component';

@Component({
    selector: 'ff-app-toolbar',
    templateUrl: 'app-toolbar.component.html',
    styleUrls: ['app-toolbar.component.scss']
})

export class AppToolbarComponent {

    private readonly _userService: IUserService;
    private readonly _designManager: IDesignManager;
    private readonly _dialog: MatDialog;
    private readonly _snackBar: MatSnackBar;

    constructor(
        @Inject(USER_SERVICE) userService: IUserService,
        @Inject(DESIGN_MANAGER) designManager: IDesignManager, 
        dialog: MatDialog,
        snackBar: MatSnackBar
    ) {
        this._userService = userService;
        this._designManager = designManager;
        this._dialog = dialog;
        this._snackBar = snackBar;
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

    saveChanges(): void {
        if (this._designManager.hasCurrentDesign) {
            this._handleSaveUnknownError(
                () => this._designManager.saveChanges()
                .then(() => this._snackBar.open('Saved', undefined, { duration: 1000 }))
                .catch(error => this._handleSaveRequestError(error))
            );
        }
        else {
            this.saveAs();
        }
    }

    saveAs(): void {
        this._dialog.open(SaveDesignComponent).afterClosed().subscribe((name: string) => {
            if (name === '') {
                return;
            }

            this._handleSaveUnknownError(
                () => this._designManager.saveDesignAs(name)
                .then(() => this._snackBar.open(`Saved as '${name}'`, undefined, { duration: 1000 }))
                .catch(error => this._handleSaveRequestError(error))
            );
        })
    }

    private _handleSaveRequestError(error: unknown): void {
        this._snackBar.open(error as string, 'Close');
    }

    private _handleSaveUnknownError(action: () => unknown): void {
        try {
            action();
        }
        catch (error) {
            console.error(error);
            this._snackBar.open('Failed to save design', 'Close');
        }
    }
}