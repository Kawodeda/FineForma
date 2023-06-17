import { BadRequest } from '../Errors';
import { LogInRequest, SignUpRequest } from '../Dto';
import { IApiClient } from '../IApiClient';
import { AuthenticationResult, failure, success } from './AuthenticationResult';
import { IAuthenticationClient } from './IAuthenticationClient';
import { IRegistrationClient } from './IRegistrationClient';

export class AuthenticationClient implements IAuthenticationClient, IRegistrationClient {

    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    async logIn(request: LogInRequest): Promise<AuthenticationResult> {
        try {
            await this._apiClient.post('/login', request);

            return success();
        }
        catch (error) {
            if (BadRequest.isBadRequest(error)) {
                return failure(error.message);
            }

            throw error;
        }
    }

    async logOut(): Promise<void> {
        await this._apiClient.post('/logout');
    }

    async signUp(request: SignUpRequest): Promise<AuthenticationResult> {
        try {
            await this._apiClient.post('/signup', request);

            return success();
        }
        catch (error) {
            if (BadRequest.isBadRequest(error)) {
                return failure(error.message);
            }

            throw error;
        }
    }
}