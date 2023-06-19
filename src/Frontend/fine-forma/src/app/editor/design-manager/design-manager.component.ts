import { Component, Inject, TemplateRef, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';

import { DESIGN_MANAGER, IDesignInfo, IDesignManager } from './i-design-manager';
import { ConfirmActionComponent } from '../../shared/confirm-action/confirm-action.component';
import { NgIfContext } from '@angular/common';

@Component({
    selector: 'ff-design-manager',
    templateUrl: 'design-manager.component.html'
})

export class DesignManagerComponent {
    
    @ViewChild('designCards', { static: true }) designCards: TemplateRef<NgIfContext<boolean>> | null = null;
    @ViewChild('empty', { static: true }) empty: TemplateRef<NgIfContext<boolean>> | null = null;

    private readonly _dialogRef: MatDialogRef<DesignManagerComponent>;
    private readonly _snackBar: MatSnackBar;
    private readonly _dialog: MatDialog;
    private readonly _designManager: IDesignManager;
    
    private _designs: IDesignInfo[] = [];
    private _showPreloader = true;

    constructor(
        dialogRef: MatDialogRef<DesignManagerComponent>,
        snackBar: MatSnackBar,
        dialog: MatDialog,
        @Inject(DESIGN_MANAGER) designManager: IDesignManager
    ) {
        this._dialogRef = dialogRef;
        this._snackBar = snackBar;
        this._dialog = dialog;
        this._designManager = designManager;

        this._updateDesignsList();
    }

    get content(): TemplateRef<NgIfContext<boolean>> | null {
        return this.designs.length === 0 ? this.empty : this.designCards;
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

    deleteDesign(name: string): void {
        const confirmDeleteDialog = this._dialog.open(
            ConfirmActionComponent, 
            { data: { actionTitle: `delete design '${name}'` } }
        );
        confirmDeleteDialog.afterClosed().subscribe((value: string) => {
            const confirmed = new Boolean(JSON.parse(value)).valueOf();
            if (confirmed) {
                this._showPreloader = true;
                this._designManager.deleteDesign(name)
                    .then(() => this._updateDesignsList())
                    .catch(error => {
                        this._snackBar.open(error as string, 'Close');
                        this._dialogRef.close();
                    });
            }
        });       
    }

    private _updateDesignsList(): void {
        this._showPreloader = true;
        this._designManager.listDesigns()
            .then(designs => this._designs = designs)
            .finally(() => this._showPreloader = false)
    }
}