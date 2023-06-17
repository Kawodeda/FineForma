import { LogInRequest, SignUpRequest } from '../Dto';
import { IApiClient } from '../IApiClient';
import { IAuthenticationClient } from './IAuthenticationClient';

export class AuthenticationClient implements IAuthenticationClient {

    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    logIn(request: LogInRequest): Promise<void> {
        return this._apiClient.post('/login', request);
    }

    logOut(): Promise<void> {
        return this._apiClient.post('/logout');
    }

    signUp(request: SignUpRequest): Promise<void> {
        return this._apiClient.post('/signup', request);
    }
}