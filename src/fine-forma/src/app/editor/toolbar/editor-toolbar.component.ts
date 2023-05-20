import { Component, Inject } from '@angular/core';

import { ISelectionService, SELECTION_SERVICE } from './i-selection-service';
import { IItemService, ITEM_SERVICE } from './i-item-service';


@Component({
    selector: 'ff-editor-toolbar',
    templateUrl: 'editor-toolbar.component.html',
    styleUrls: ['editor-toolbar.component.scss']
})
export class ToolbarComponent {

    private readonly _selectionService: ISelectionService;
    private readonly _itemService: IItemService;

    constructor(
        @Inject(SELECTION_SERVICE) selectionService: ISelectionService,
        @Inject(ITEM_SERVICE) itemService: IItemService) {
        this._selectionService = selectionService;
        this._itemService = itemService;
    }

    get canDelete(): boolean {
        return !this._selectionService.isSelectionEmpty;
    }

    onSelectClick(): void {
        this._selectionService.selectItemAt(0, 0);
    }

    onClearSelectionClick(): void {
        this._selectionService.clearSelection();
    }

    async onDeleteClick(): Promise<void> {
        await this._itemService.deleteSelectedItem();
    }

    async onInsertRectangleClick(): Promise<void> {
        await this._itemService.insertRectangle(700, 450);
    }

    async onInsertCircleClick(): Promise<void> {
        await this._itemService.insertCircle(700, 450);
    }

    async onInsertLineClick(): Promise<void> {
        await this._itemService.insertLine(700, 450);
    }
}