export class BadRequest extends Error {
    
    static isBadRequest(error: unknown): error is BadRequest {
        return error instanceof BadRequest;
    }
}