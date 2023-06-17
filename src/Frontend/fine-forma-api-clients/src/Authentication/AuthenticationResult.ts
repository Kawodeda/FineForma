export type AuthenticationResult = Success | Failure;

export type Success = Record<string, never>;

export type Failure = {
    message: string;
}

export function success(): Success {
    return { }
}

export function isSuccess(result: AuthenticationResult): result is Success {
    return typeof result === 'object' && !('message' in result);
}

export function failure(message: string): Failure {
    return { message: message }
}

export function isFailure(result: AuthenticationResult): result is Failure {
    return typeof result === 'object' && 'message' in result;
}