import { Inject, Injectable } from '@angular/core';

import { IItemService } from './i-item-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { AddItemToLayerAtCommand, Brushes, Command, Item, Pen, RemoveItemCommand, Vector2, Viewport, createCircle, createLine, createRectangle } from 'fine-forma-core';
import { canvasToDesignPoint } from '../shared/reference-frame-converter';

@Injectable()
export class ItemService implements IItemService {

    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }

    private get _selectedItem(): Item {
        return this._viewerProvider.viewer.selection.single;
    }

    private get _viewport(): Viewport {
        return this._viewerProvider.viewer.viewport;
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
        const position = canvasToDesignPoint(new Vector2(x, y), this._viewport);

        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createRectangle(position.x, position.y, 150, 150).setFill(Brushes.magenta()).build(), 
                0)
        ]));
    }
    
    insertCircle(x: number, y: number): Promise<void> {
        const position = canvasToDesignPoint(new Vector2(x, y), this._viewport);

        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createCircle(position.x, position.y, 100).setFill(Brushes.cyan()).build(), 
                0)
        ]));
    }

    insertLine(x: number, y: number): Promise<void> {
        const position = canvasToDesignPoint(new Vector2(x, y), this._viewport);

        return this._viewerProvider.viewer.execute(new Command([
            new AddItemToLayerAtCommand(
                createLine(position.x - 100, position.y - 80, 200, 160)
                    .setStroke(new Pen(Brushes.yellow(), 3))
                    .build(), 
                0)
        ]));
    }
}