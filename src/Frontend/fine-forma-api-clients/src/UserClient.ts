import { IApiClient, UserInfo } from '..';
import { IUserClient } from './IUserClient';

export class UserClient implements IUserClient {
    
    private readonly _apiClient: IApiClient;

    constructor(apiClient: IApiClient) {
        this._apiClient = apiClient;
    }

    isAuthenticated(): Promise<boolean> {
        return this._apiClient.get<boolean>('/authenticated');
    }
    
    getUserInfo(): Promise<UserInfo> {
        return this._apiClient.get<UserInfo>('/user/info');
    }
}