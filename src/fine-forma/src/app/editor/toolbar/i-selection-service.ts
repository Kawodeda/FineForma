import { InjectionToken } from '@angular/core';

export const SELECTION_SERVICE = new InjectionToken<ISelectionService>('selection-service');

export interface ISelectionService {

    selectItemAt(layerIndex: number, itemIndex: number): void;

    clearSelection(): void;
}