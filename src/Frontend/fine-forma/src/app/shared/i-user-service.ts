import { InjectionToken } from '@angular/core';

export const USER_SERVICE = new InjectionToken<IUserService>('user-service');

export interface IUserService {

    get isAuthorized(): boolean;

    get user(): IUser | null;

    updateState(): void;
}

export interface IUser {

    username: string;
}