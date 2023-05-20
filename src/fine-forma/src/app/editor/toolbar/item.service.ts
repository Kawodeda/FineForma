import { Inject, Injectable } from '@angular/core';

import { IItemService } from './i-item-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { AddItemToLayerAtCommand, Brushes, Command, Item, Pen, RemoveItemCommand, createCircle, createLine, createRectangle } from 'fine-forma-core';

@Injectable()
export class ItemService implements IItemService {

    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    private get _selectedItem(): Item {
        return this._viewerProvider.viewer.selection.single;
    }

    deleteSelectedItem(): Promise<void> {
        if (this._viewerProvider.viewer.selection.isEmpty) {
            throw new Error('There is no selected item');
        }

        return this._viewerProvider.viewer.execute(new Command([
            new RemoveItemCommand(this._selectedItem)
        ]));
    }

    insertRectangle(x: number, y: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createRectangle(x, y, 150, 150).setFill(Brushes.magenta()).build(), 
                0)
        ]));
    }
    
    insertCircle(x: number, y: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createCircle(x, y, 100).setFill(Brushes.cyan()).build(), 
                0)
        ]));
    }

    insertLine(x: number, y: number): Promise<void> {
        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createLine(x - 100, y - 80, 200, 160)
                    .setStroke(new Pen(Brushes.yellow(), 3))
                    .build(), 
                0)
        ]));
    }
}