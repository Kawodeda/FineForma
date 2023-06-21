import { Inject, Injectable } from '@angular/core';

import { Brush, Color, Command, Item, Pen, RgbColor, SelectItemAtCommand, SetFillStyleCommand, SetStrokeStyleCommand, SolidBrush, isItemWithFill, isItemWithStroke } from 'fine-forma-core';

import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { IItemStyleService } from './i-item-style-service';
import { IRgbColor } from './rgb-color';

@Injectable()
export class ItemStyleService implements IItemStyleService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    get hasFillColor(): boolean {
        return this._hasSelectedItem && isItemWithFill(this._selectedItem);
    }

    get hasBorder(): boolean {
        return this._hasSelectedItem && isItemWithStroke(this._selectedItem);
    }
    
    get fillColor(): IRgbColor {
        if (isItemWithFill(this._selectedItem) && this._isSolidBrush(this._selectedItem.fillStyle)) {
            const fillColor = this._selectedItem.fillStyle.color;

            return this._toRgbColor(fillColor);
        }

        throw new Error('Item has no fill color');
    }

    get borderColor(): IRgbColor {
        if (isItemWithStroke(this._selectedItem) && this._isSolidBrush(this._selectedItem.strokeStyle.style)) {
            const borderColor = this._selectedItem.strokeStyle.style.color;

            return this._toRgbColor(borderColor);
        }

        throw new Error('Item has no border color');
    }

    get borderWidth(): number {
        if (isItemWithStroke(this._selectedItem)) {
            return this._selectedItem.strokeStyle.width;
        }

        throw new Error('Item has no border width');
    }

    private get _hasSelectedItem(): boolean {
        return this._viewerProvider.viewer.selection.isSingle;
    }

    private get _selectedItem(): Item {
        return this._viewerProvider.viewer.selection.single;
    }
    
    async setFillColor(fillColor: IRgbColor): Promise<void> {
        if (!isItemWithFill(this._selectedItem)) {
            throw new Error('Unable to set fill color');
        }

        const { layerIndex, itemIndex } = this._viewerProvider.viewer.design.getIndexOf(this._selectedItem);

        return this._viewerProvider.viewer.execute(new Command([
            new SetFillStyleCommand(this._selectedItem, this._toBrush(fillColor))
        ], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]));
    }

    async setBorderColor(borderColor: IRgbColor): Promise<void> {
        if (!isItemWithStroke(this._selectedItem)) {
            throw new Error('Unable to set border color');
        }

        const { layerIndex, itemIndex } = this._viewerProvider.viewer.design.getIndexOf(this._selectedItem);

        return this._viewerProvider.viewer.execute(new Command([
            new SetStrokeStyleCommand(
                this._selectedItem, 
                this._penWithColor(this._selectedItem.strokeStyle, borderColor)
            )
        ], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]));
    }

    async setBorderWidth(borderWidth: number): Promise<void> {
        if (!isItemWithStroke(this._selectedItem)) {
            throw new Error('Unable to set border width');
        }

        const { layerIndex, itemIndex } = this._viewerProvider.viewer.design.getIndexOf(this._selectedItem);

        return this._viewerProvider.viewer.execute(new Command([
            new SetStrokeStyleCommand(
                this._selectedItem, 
                this._penWithWidth(this._selectedItem.strokeStyle, borderWidth)
            )
        ], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]));
    }

    private _isSolidBrush(brush: Brush): brush is SolidBrush {
        return brush instanceof SolidBrush;
    }

    private _toRgbColor(color: Color): IRgbColor {
        const preview = color.preview;

        return {
            r: preview.r.value,
            g: preview.g.value,
            b: preview.b.value
        };
    }

    private _toBrush(color: IRgbColor): Brush {
        return new SolidBrush(new RgbColor(color.r, color.g, color.b, 255));
    }

    private _penWithColor(pen: Pen, color: IRgbColor): Pen {
        return new Pen(
            this._toBrush(color),
            pen.width,
            pen.dash
        );
    }

    private _penWithWidth(pen: Pen, width: number): Pen {
        return new Pen(
            pen.style,
            width,
            pen.dash
        );
    }
}