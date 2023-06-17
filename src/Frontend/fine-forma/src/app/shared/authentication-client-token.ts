import { InjectionToken } from '@angular/core';

import { IAuthenticationClient } from 'fine-forma-api-clients';

export const AUTHENTICATION_CLIENT = new InjectionToken<IAuthenticationClient>('authentication-client');