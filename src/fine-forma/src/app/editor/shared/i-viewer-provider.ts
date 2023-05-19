import { InjectionToken } from '@angular/core';

import { Viewer } from 'fine-forma-core';

export const VIEWER_PROVIDER = new InjectionToken<IViewerProvider>('viewer-provider');

export interface IViewerProvider {

    get viewer(): Viewer;
}