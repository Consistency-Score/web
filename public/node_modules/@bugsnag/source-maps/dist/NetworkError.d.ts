export declare enum NetworkErrorCode {
    UNKNOWN = 0,
    DUPLICATE = 1,
    TIMEOUT = 2,
    MISC_BAD_REQUEST = 3,
    EMPTY_FILE = 4,
    INVALID_API_KEY = 5,
    SERVER_ERROR = 6,
    CONNECTION_REFUSED = 7,
    NOT_FOUND = 8
}
export declare class NetworkError extends Error {
    isRetryable: boolean;
    code: NetworkErrorCode;
    cause: Error | null;
    responseText: string | null;
}
