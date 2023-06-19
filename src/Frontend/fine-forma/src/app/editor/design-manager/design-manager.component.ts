import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { DESIGN_MANAGER, IDesignInfo, IDesignManager } from './i-design-manager';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'ff-design-manager',
    templateUrl: 'design-manager.component.html'
})

export class DesignManagerComponent {
    
    private readonly _dialogRef: MatDialogRef<DesignManagerComponent>;
    private readonly _snackBar: MatSnackBar;
    private readonly _designManager: IDesignManager;
    
    private _designs: IDesignInfo[] = [];
    private _showPreloader = true;

    constructor(
        dialogRef: MatDialogRef<DesignManagerComponent>,
        snackBar: MatSnackBar,
        @Inject(DESIGN_MANAGER) designManager: IDesignManager
    ) {
        this._dialogRef = dialogRef;
        this._snackBar = snackBar;
        this._designManager = designManager;
        this._designManager.listDesigns()
            .then(designs => this._designs = designs)
            .finally(() => this._showPreloader = false)
    }

    get designs(): IDesignInfo[] {
        return this._designs;
    }

    get showPreloader(): boolean {
        return this._showPreloader;
    }

    openDesign(name: string): void {
        console.log('open', name);
        this._designManager.openDesign(name)
            .catch(error => this._snackBar.open(error as string, 'Close'))
            .finally(() => this._dialogRef.close());
    }
}