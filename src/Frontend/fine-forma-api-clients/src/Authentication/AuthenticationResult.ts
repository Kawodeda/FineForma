export type AuthenticationResult = Success | Failure;

export type Success = Record<string, never>;

export type Failure = {
    message: string;
}

export function success(): Success {
    return { }
}

export function failure(message: string): Failure {
    return { message: message }
}