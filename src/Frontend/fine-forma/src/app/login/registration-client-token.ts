import { InjectionToken } from '@angular/core';

import { IRegistrationClient } from 'fine-forma-api-clients';

export const REGISTRATION_CLIENT = new InjectionToken<IRegistrationClient>('registration-client');