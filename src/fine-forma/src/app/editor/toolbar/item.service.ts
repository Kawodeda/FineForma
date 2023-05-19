import { Inject, Injectable } from '@angular/core';

import { IItemService } from './i-item-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { Command, Item, RemoveItemCommand } from 'fine-forma-core';

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
}