import { InjectionToken } from '@angular/core';

import { IDesignsClient } from 'fine-forma-api-clients';

export const DESIGNS_CLIENT = new InjectionToken<IDesignsClient>('designs-client');