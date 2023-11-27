export class APIError extends Error {
    code: number
    text: string

    constructor(code, text) {
        super();
        this.code = code;
        this.text = text;
    }

    toJson() {
        return {
            error: {
                code: this.code,
                text: this.text
            }
        }
    }

    toString() {
        return `API Error ${this.code}: ${this.text}`;
    }
}

export const errors = {
    INVALID_PARAMETER: new APIError(1, "Invalid parameter"),
    UNAUTHORIZED: new APIError(2, "Unauthorized"),
    INSUFFICIENT_PRIVILEGES: new APIError(3, "Insufficient privileges"),
    USER_NOT_FOUND: new APIError(4, "User not found"),
    INVALID_PASSWORD: new APIError(5, "Invalid password"),
    ALREADY_AUTHORIZED: new APIError(6, "Already logged in"),
    NOT_FOUND: new APIError(7, "Not found"),
    FAILED: new APIError(8, "Failed"),
    USER_ALREADY_EXISTS: new APIError(9, "User already exists"),
    NOT_MODIFIED: new APIError(10, "Not modified"),
    UNKNOWN_ERROR: new APIError(11, "Unknown error")
};