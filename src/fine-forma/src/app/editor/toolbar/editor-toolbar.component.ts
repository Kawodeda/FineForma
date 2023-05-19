import { Component, Inject } from '@angular/core';

import { ISelectionService, SELECTION_SERVICE } from './i-selection-service';

@Component({
    selector: 'ff-editor-toolbar',
    templateUrl: 'editor-toolbar.component.html',
    styleUrls: ['editor-toolbar.component.scss']
})

export class ToolbarComponent {

    private readonly _selectionService: ISelectionService;

    constructor(@Inject(SELECTION_SERVICE) selectionService: ISelectionService) {
        this._selectionService = selectionService;
    }

    onSelectClick(): void {
        this._selectionService.selectItemAt(0, 0);
    }

    onClearSelectionClick(): void {
        this._selectionService.clearSelection();
    }
}