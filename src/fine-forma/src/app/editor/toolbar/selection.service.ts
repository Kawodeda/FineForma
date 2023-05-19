import { Inject, Injectable } from '@angular/core';

import { ClearSelectionCommand, Command, SelectItemAtCommand } from 'fine-forma-core';

import { ISelectionService } from './i-selection-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';

@Injectable()
export class SelectionService implements ISelectionService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    get isSelectionEmpty(): boolean {
        return this._viewerProvider.viewer.selection.isEmpty;
    }

    selectItemAt(layerIndex: number, itemIndex: number): void {
        this._viewerProvider.viewer.execute(new Command([], [], [
            new SelectItemAtCommand(layerIndex, itemIndex)
        ]))
        .catch(reason => console.error(reason));
    }

    clearSelection(): void {
        this._viewerProvider.viewer.execute(new Command([], [], [
            new ClearSelectionCommand()
        ]))
        .catch(reason => console.error(reason));
    }
}