import { InjectionToken } from '@angular/core';

import { IImagesClient } from 'fine-forma-api-clients';

export const IMAGES_CLIENT = new InjectionToken<IImagesClient>('images-client');