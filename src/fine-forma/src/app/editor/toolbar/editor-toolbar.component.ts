import { Component, Inject } from '@angular/core';

import { ISelectionService, SELECTION_SERVICE } from './i-selection-service';
import { IZoomService, ZOOM_SERVICE } from './i-zoom-service';
import { IItemService, ITEM_SERVICE } from './i-item-service';

const ZOOM_STEP = 0.2;

@Component({
    selector: 'ff-editor-toolbar',
    templateUrl: 'editor-toolbar.component.html',
    styleUrls: ['editor-toolbar.component.scss']
})
export class ToolbarComponent {

    private readonly _selectionService: ISelectionService;
    private readonly _zoomService: IZoomService;
    private readonly _itemService: IItemService;

    constructor(
        @Inject(SELECTION_SERVICE) selectionService: ISelectionService,
        @Inject(ZOOM_SERVICE) zoomService: IZoomService,
        @Inject(ITEM_SERVICE) itemService: IItemService) {
        this._selectionService = selectionService;
        this._zoomService = zoomService;
        this._itemService = itemService;
    }

    get zoom(): number {
        return this._zoomService.zoom;
    }

    get canZoomIn(): boolean {
        return this._zoomService.canIncreaseZoomBy(ZOOM_STEP);
    }

    get canZoomOut(): boolean {
        return this._zoomService.canDecreaseZoomBy(ZOOM_STEP);
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

    async onZoomInClick(): Promise<void> {
        await this._zoomService.increaseZoom(ZOOM_STEP);
    }

    async onZoomOutClick():  Promise<void> {
        await this._zoomService.decreaseZoom(ZOOM_STEP);
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