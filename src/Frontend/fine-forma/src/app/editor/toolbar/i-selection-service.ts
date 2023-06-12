import { InjectionToken } from '@angular/core';

export const SELECTION_SERVICE = new InjectionToken<ISelectionService>('selection-service');

export interface ISelectionService {

    get isSelectionEmpty(): boolean;

    get selectionAngle(): number;

    get canResetAngle(): boolean;

    selectItemAt(layerIndex: number, itemIndex: number): void;

    clearSelection(): void;

    resetSelectionAngle(): void;
}