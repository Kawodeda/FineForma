import { InjectionToken } from '@angular/core';

import { IUserClient } from 'fine-forma-api-clients';

export const USER_CLIENT = new InjectionToken<IUserClient>('user-client');