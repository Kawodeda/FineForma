import { Inject, Injectable } from '@angular/core';

import { DesignInfo, IDesignsClient, parseDesign } from 'fine-forma-api-clients';

import { IDesignInfo, IDesignManager } from './i-design-manager';
import { DESIGNS_CLIENT } from './designs-client-token';
import { IViewerProvider, VIEWER_PROVIDER } from '../../shared/i-viewer-provider';
import { buildDesignDto } from '../../../../../fine-forma-api-clients/src/Dto/Builders/DesignDtoBuilder';

@Injectable()
export class DesignManager implements IDesignManager {

    private readonly _designsClient: IDesignsClient;
    private readonly _viewerProvider: IViewerProvider;

    private _currentDesignName: string | null = null;

    constructor(
        @Inject(DESIGNS_CLIENT) designsClient: IDesignsClient,
        @Inject(VIEWER_PROVIDER) viewerProvider: IViewerProvider
    ) {
        this._designsClient = designsClient;
        this._viewerProvider = viewerProvider;
    }

    get hasCurrentDesign(): boolean {
        return this._currentDesignName != null;
    }

    get currentDesignName(): string {
        if (this._currentDesignName == null) {
            throw new Error();
        }

        return this._currentDesignName;
    }

    async listDesigns(): Promise<IDesignInfo[]> {
        const designs = await this._designsClient.listDesigns();
        
        return designs.map(info => this._parseDesignInfo(info));
    }

    async openDesign(name: string): Promise<void> {
        const response = await this._designsClient.loadDesign(name);
        parseDesign(response).caseOf({
            just: design => {
                this._viewerProvider.viewer.design = design;
                this._currentDesignName = name;
            },
            nothing: () => { 
                throw new Error('Failed to parse design'); 
            }
        });
    }

    saveChanges(): Promise<void> {
        return this._designsClient.saveDesign(
            buildDesignDto(this._viewerProvider.viewer.design), 
            this.currentDesignName
        );
    }

    saveDesignAs(name: string): Promise<void> {
        return this._designsClient.saveDesign(
            buildDesignDto(this._viewerProvider.viewer.design), 
            name
        )
        .then(() => {
            this._currentDesignName = name
        });
    }

    deleteDesign(name: string): Promise<void> {
        return this._designsClient.deleteDesign(name);
    }

    private _parseDesignInfo(info: DesignInfo): IDesignInfo {
        return {
            name: info.name,
            lastModified: new Date(info.lastModified)
        }
    }
}