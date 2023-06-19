import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    selector: 'ff-confirm-action',
    templateUrl: 'confirm-action.component.html'
})

export class ConfirmActionComponent {
    
    @Input() actionTitle = '';

    @Output() yes = new EventEmitter<void>();
    @Output() no = new EventEmitter<void>();

    constructor(@Inject(MAT_DIALOG_DATA) data: { actionTitle: string }) {
        this.actionTitle = data.actionTitle;
    }
}