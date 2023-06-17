import { LogInRequest, SignUpRequest } from '../Dto';

export interface IAuthenticationClient {

    logIn(request: LogInRequest): Promise<void>;

    logOut(): Promise<void>;

    signUp(request: SignUpRequest): Promise<void>;
}