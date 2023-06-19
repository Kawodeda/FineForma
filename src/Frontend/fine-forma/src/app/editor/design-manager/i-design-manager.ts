import { InjectionToken } from '@angular/core';

export const DESIGN_MANAGER = new InjectionToken<IDesignManager>('design-manager');

export interface IDesignManager {

    listDesigns(): Promise<IDesignInfo[]>;

    openDesign(name: string): Promise<void>;

    deleteDesign(name: string): Promise<void>;
}

export interface IDesignInfo {

    get name(): string;

    get lastModified(): Date;
}