"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkError = exports.NetworkErrorCode = void 0;
var NetworkErrorCode;
(function (NetworkErrorCode) {
    NetworkErrorCode[NetworkErrorCode["UNKNOWN"] = 0] = "UNKNOWN";
    NetworkErrorCode[NetworkErrorCode["DUPLICATE"] = 1] = "DUPLICATE";
    NetworkErrorCode[NetworkErrorCode["TIMEOUT"] = 2] = "TIMEOUT";
    NetworkErrorCode[NetworkErrorCode["MISC_BAD_REQUEST"] = 3] = "MISC_BAD_REQUEST";
    NetworkErrorCode[NetworkErrorCode["EMPTY_FILE"] = 4] = "EMPTY_FILE";
    NetworkErrorCode[NetworkErrorCode["INVALID_API_KEY"] = 5] = "INVALID_API_KEY";
    NetworkErrorCode[NetworkErrorCode["SERVER_ERROR"] = 6] = "SERVER_ERROR";
    NetworkErrorCode[NetworkErrorCode["CONNECTION_REFUSED"] = 7] = "CONNECTION_REFUSED";
    NetworkErrorCode[NetworkErrorCode["NOT_FOUND"] = 8] = "NOT_FOUND";
})(NetworkErrorCode = exports.NetworkErrorCode || (exports.NetworkErrorCode = {}));
class NetworkError extends Error {
    constructor() {
        super(...arguments);
        this.isRetryable = true;
        this.code = NetworkErrorCode.UNKNOWN;
        this.cause = null;
        this.responseText = null;
    }
}
exports.NetworkError = NetworkError;
//# sourceMappingURL=NetworkError.js.map