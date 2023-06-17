import { LogInRequest } from '../Dto';
import { AuthenticationResult } from './AuthenticationResult';

export interface IAuthenticationClient {

    logIn(request: LogInRequest): Promise<AuthenticationResult>;

    logOut(): Promise<void>;
}