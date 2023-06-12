import { Component, Inject, Input } from '@angular/core';

import { ISelectionService, SELECTION_SERVICE } from './i-selection-service';
import { IItemService, ITEM_SERVICE } from './i-item-service';

@Component({
    selector: 'ff-editor-toolbar',
    templateUrl: 'editor-toolbar.component.html',
    styleUrls: ['editor-toolbar.component.scss']
})
export class ToolbarComponent {

    @Input() viewerWidth = 0;
    @Input() viewerHeight = 0;

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

    async onDeleteClick(): Promise<void> {
        await this._itemService.deleteSelectedItem();
    }

    async onInsertRectangleClick(): Promise<void> {
        await this._itemService.insertRectangle(this.viewerWidth / 2, this.viewerHeight / 2);
    }

    async onInsertCircleClick(): Promise<void> {
        await this._itemService.insertCircle(this.viewerWidth / 2, this.viewerHeight / 2);
    }

    async onInsertLineClick(): Promise<void> {
        await this._itemService.insertLine(this.viewerWidth / 2, this.viewerHeight / 2);
    }
}