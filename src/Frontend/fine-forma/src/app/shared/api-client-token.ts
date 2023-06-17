import { InjectionToken } from '@angular/core';

import { IApiClient } from 'fine-forma-api-clients';

export const API_CLIENT = new InjectionToken<IApiClient>('api-client');