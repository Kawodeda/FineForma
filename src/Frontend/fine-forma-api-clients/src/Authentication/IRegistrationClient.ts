import { SignUpRequest } from '../Dto';
import { AuthenticationResult } from './AuthenticationResult';

export interface IRegistrationClient {

    signUp(request: SignUpRequest): Promise<AuthenticationResult>;
}