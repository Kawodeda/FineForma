import { Component, Inject, Input } from '@angular/core';

import { ISelectionService, SELECTION_SERVICE } from './i-selection-service';
import { IItemService, ITEM_SERVICE } from './i-item-service';
import { IRgbColor } from './rgb-color';
import { IItemStyleService, ITEM_STYLE_SERVICE } from './i-item-style-service';
import { handleAsyncAction } from '../../shared/utils';

@Component({
    selector: 'ff-editor-toolbar',
    templateUrl: 'editor-toolbar.component.html',
    styleUrls: ['editor-toolbar.component.scss']
})
export class EditorToolbarComponent {

    @Input() viewerWidth = 0;
    @Input() viewerHeight = 0;

    private readonly _selectionService: ISelectionService;
    private readonly _itemService: IItemService;
    private readonly _itemStyleService: IItemStyleService;

    constructor(
        @Inject(SELECTION_SERVICE) selectionService: ISelectionService,
        @Inject(ITEM_SERVICE) itemService: IItemService,
        @Inject(ITEM_STYLE_SERVICE) itemStyleService: IItemStyleService
    ) {
        this._selectionService = selectionService;
        this._itemService = itemService;
        this._itemStyleService = itemStyleService;
    }

    get canDelete(): boolean {
        return !this._selectionService.isSelectionEmpty;
    }

    get showItemAngle(): boolean {
        return !this._selectionService.isSelectionEmpty;
    }

    get itemAngle(): number {
        return this._selectionService.selectionAngle;
    }

    get canResetAngle(): boolean {
        return this._selectionService.canResetAngle;
    }

    get hasFillColor(): boolean {
        return this._itemStyleService.hasFillColor;
    }

    get fillColor(): IRgbColor {
        return this._itemStyleService.hasFillColor ? this._itemStyleService.fillColor : this.defaultColor;
    }

    get hasBorder(): boolean {
        return this._itemStyleService.hasBorder;
    }

    get borderColor(): IRgbColor {
        return this._itemStyleService.hasBorder ? this._itemStyleService.borderColor : this.defaultColor;
    }

    get borderWidth(): number {
        return this._itemStyleService.hasBorder ? this._itemStyleService.borderWidth : 0;
    }

    get hasDashes(): boolean {
        return this._itemStyleService.hasBorder ? this._itemStyleService.hasDashes : false;
    }

    get defaultColor(): IRgbColor {
        return { r: 0, g: 0, b: 0 };
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

    onResetAngleClick(): void {
        this._selectionService.resetSelectionAngle();
    }

    onFillColorChanged(color: IRgbColor): void {
        if (this._itemStyleService.hasFillColor) {
            handleAsyncAction(
                this._itemStyleService.setFillColor(color)
            );
        }
    }

    onBorderColorChanged(color: IRgbColor): void {
        if (this._itemStyleService.hasBorder) {
            handleAsyncAction(
                this._itemStyleService.setBorderColor(color)
            );
        }
    }

    onBorderWidthChanged(width: number): void {
        if (this._itemStyleService.hasBorder) {
            handleAsyncAction(
                this._itemStyleService.setBorderWidth(width)
            );
        }
    }

    onDashesToggleChanged(): void {
        if (this._itemStyleService.hasBorder) {
            handleAsyncAction(
                this._itemStyleService.toggleDashes()
            );
        }
    }
}