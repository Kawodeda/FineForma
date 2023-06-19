import { InjectionToken } from '@angular/core';

export const DESIGN_MANAGER = new InjectionToken<IDesignManager>('design-manager');

export interface IDesignManager {

    get hasCurrentDesign(): boolean;

    get currentDesignName(): string;

    listDesigns(): Promise<IDesignInfo[]>;

    openDesign(name: string): Promise<void>;

    saveChanges(): Promise<void>;

    saveDesignAs(name: string): Promise<void>;

    deleteDesign(name: string): Promise<void>;
}

export interface IDesignInfo {

    get name(): string;

    get lastModified(): Date;
}