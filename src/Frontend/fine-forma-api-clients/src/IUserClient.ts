import { UserInfo } from './Dto';

export interface IUserClient {

    isAuthenticated(): Promise<boolean>;

    getUserInfo(): Promise<UserInfo>;
}