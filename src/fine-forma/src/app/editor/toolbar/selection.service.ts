import { Inject, Injectable } from '@angular/core';

import { ClearSelectionCommand, Command, RotateItemCommand, SelectItemAtCommand, Selection, nearlyEquals } from 'fine-forma-core';

import { ISelectionService } from './i-selection-service';
import { IViewerProvider, VIEWER_PROVIDER } from '../shared/i-viewer-provider';
import { handleAsyncAction } from '../../shared/utils';

@Injectable()
export class SelectionService implements ISelectionService {
    
    private readonly _viewerProvider: IViewerProvider;

    constructor(@Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider) {
        this._viewerProvider = viewerProvider;
    }
    
    get isSelectionEmpty(): boolean {
        return this._selection.isEmpty;
    }

    get selectionAngle(): number {
        return this._selection.isSingle 
            ? this._normalizeAngle(this._selection.single.transform.angle)
            : 0;
    }

    get canResetAngle(): boolean {
        return !nearlyEquals(this.selectionAngle, 0);
    }

    private get _selection(): Selection {
        return this._viewerProvider.viewer.selection;
    }

    selectItemAt(layerIndex: number, itemIndex: number): void {
        handleAsyncAction(
            this._viewerProvider.viewer.execute(new Command([], [], [
                new SelectItemAtCommand(layerIndex, itemIndex)
            ]))
        );
    }

    clearSelection(): void {
        handleAsyncAction(
            this._viewerProvider.viewer.execute(new Command([], [], [
                new ClearSelectionCommand()
            ]))
        );
    }

    resetSelectionAngle(): void {
        if (!this._selection.isSingle) {
            return;
        }

        const { layerIndex, itemIndex } = this._viewerProvider.viewer.design.getIndexOf(this._selection.single);

        handleAsyncAction(
            this._viewerProvider.viewer.execute(new Command([
                new RotateItemCommand(
                    this._selection.single, 
                    -this._selection.single.transform.angle, 
                    this._selection.single.controls.path.bounds.rectangle.center
                )
            ], [], [
                new SelectItemAtCommand(layerIndex, itemIndex)
            ]))
        );
    }

    private _normalizeAngle(angle: number): number {
        angle %= 360;

        return angle < 0
            ? 360 + angle
            : angle;
    }
}