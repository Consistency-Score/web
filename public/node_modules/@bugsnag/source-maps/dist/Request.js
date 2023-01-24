"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = exports.isRetryable = exports.send = void 0;
const https_1 = __importDefault(require("https"));
const http_1 = __importDefault(require("http"));
const concat_stream_1 = __importDefault(require("concat-stream"));
const url_1 = __importDefault(require("url"));
const form_data_1 = __importDefault(require("form-data"));
const NetworkError_1 = require("./NetworkError");
const MAX_ATTEMPTS = 5;
const RETRY_INTERVAL_MS = parseInt(process.env.BUGSNAG_RETRY_INTERVAL_MS) || 1000;
const TIMEOUT_MS = parseInt(process.env.BUGSNAG_TIMEOUT_MS) || 30000;
function request(endpoint, payload, requestOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        let attempts = 0;
        const go = () => __awaiter(this, void 0, void 0, function* () {
            try {
                attempts++;
                yield send(endpoint, payload, requestOpts);
            }
            catch (err) {
                if (err && err.isRetryable !== false && attempts < MAX_ATTEMPTS) {
                    yield new Promise((resolve) => setTimeout(resolve, RETRY_INTERVAL_MS));
                    return yield go();
                }
                throw err;
            }
        });
        yield go();
    });
}
exports.default = request;
function createFormData(payload) {
    const formData = new form_data_1.default();
    formData.append('apiKey', payload.apiKey);
    switch (payload.type) {
        case 0 /* Browser */:
        case 2 /* Node */:
            return appendJsFormData(formData, payload);
        case 1 /* ReactNative */:
            return appendReactNativeFormData(formData, payload);
    }
}
function appendJsFormData(formData, payload) {
    if (payload.appVersion)
        formData.append('appVersion', payload.appVersion);
    if (payload.codeBundleId)
        formData.append('codeBundleId', payload.codeBundleId);
    formData.append('minifiedUrl', payload.minifiedUrl);
    formData.append('sourceMap', payload.sourceMap.data, { filepath: payload.sourceMap.filepath });
    if (payload.minifiedFile)
        formData.append('minifiedFile', payload.minifiedFile.data, { filepath: payload.minifiedFile.filepath });
    if (payload.overwrite)
        formData.append('overwrite', payload.overwrite.toString());
    return formData;
}
function appendReactNativeFormData(formData, payload) {
    formData.append('platform', payload.platform);
    formData.append('overwrite', payload.overwrite.toString());
    formData.append('dev', payload.dev.toString());
    formData.append('sourceMap', payload.sourceMap.data, { filepath: payload.sourceMap.filepath });
    formData.append('bundle', payload.bundle.data, { filepath: payload.bundle.filepath });
    if (payload.appVersion) {
        formData.append('appVersion', payload.appVersion);
    }
    if (payload.codeBundleId) {
        formData.append('codeBundleId', payload.codeBundleId);
    }
    if (payload.appBundleVersion) {
        formData.append('appBundleVersion', payload.appBundleVersion);
    }
    if (payload.appVersionCode) {
        formData.append('appVersionCode', payload.appVersionCode);
    }
    return formData;
}
function send(endpoint, payload, requestOpts) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const formData = createFormData(payload);
            const parsedUrl = url_1.default.parse(endpoint);
            const req = (parsedUrl.protocol === 'https:' ? https_1.default : http_1.default).request({
                method: 'POST',
                hostname: parsedUrl.hostname,
                path: parsedUrl.path || '/',
                headers: formData.getHeaders(),
                port: parsedUrl.port || undefined,
                agent: requestOpts && requestOpts.agent
            }, res => {
                res.pipe(concat_stream_1.default((bodyBuffer) => {
                    if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300)
                        return resolve();
                    const err = new NetworkError_1.NetworkError(`HTTP status ${res.statusCode} received from upload API`);
                    err.responseText = bodyBuffer.toString();
                    if (!isRetryable(res.statusCode)) {
                        err.isRetryable = false;
                    }
                    if (res.statusCode && (res.statusCode >= 400 && res.statusCode < 500)) {
                        switch (res.statusCode) {
                            case 401:
                                err.code = NetworkError_1.NetworkErrorCode.INVALID_API_KEY;
                                break;
                            case 409:
                                err.code = NetworkError_1.NetworkErrorCode.DUPLICATE;
                                break;
                            case 422:
                                err.code = NetworkError_1.NetworkErrorCode.EMPTY_FILE;
                                break;
                            default:
                                err.code = NetworkError_1.NetworkErrorCode.MISC_BAD_REQUEST;
                        }
                    }
                    else {
                        err.code = NetworkError_1.NetworkErrorCode.SERVER_ERROR;
                    }
                    return reject(err);
                }));
            });
            formData.pipe(req);
            addErrorHandler(req, reject);
            addTimeout(req, reject);
        });
    });
}
exports.send = send;
function isRetryable(status) {
    return (!status || (status < 400 ||
        status > 499 ||
        [
            408,
            429 // too many requests
        ].indexOf(status) !== -1));
}
exports.isRetryable = isRetryable;
function fetch(endpoint) {
    return new Promise((resolve, reject) => {
        const parsedUrl = url_1.default.parse(endpoint);
        const req = (parsedUrl.protocol === 'https:' ? https_1.default : http_1.default).get(endpoint, res => {
            res.pipe(concat_stream_1.default((bodyBuffer) => {
                if (res.statusCode === 200) {
                    return resolve(bodyBuffer.toString());
                }
                const err = new NetworkError_1.NetworkError(`HTTP status ${res.statusCode} received from bundle server`);
                err.responseText = bodyBuffer.toString();
                if (!isRetryable(res.statusCode)) {
                    err.isRetryable = false;
                }
                if (res.statusCode && (res.statusCode >= 400 && res.statusCode < 500)) {
                    err.code = NetworkError_1.NetworkErrorCode.MISC_BAD_REQUEST;
                }
                else {
                    err.code = NetworkError_1.NetworkErrorCode.SERVER_ERROR;
                }
                return reject(err);
            }));
        });
        addErrorHandler(req, reject);
        addTimeout(req, reject);
    });
}
exports.fetch = fetch;
function addErrorHandler(req, reject) {
    req.on('error', e => {
        const err = new NetworkError_1.NetworkError('Unknown connection error');
        err.cause = e;
        const failureReason = e.code;
        if (failureReason === 'ECONNREFUSED') {
            err.code = NetworkError_1.NetworkErrorCode.CONNECTION_REFUSED;
        }
        else {
            err.code = NetworkError_1.NetworkErrorCode.UNKNOWN;
        }
        reject(err);
    });
}
function addTimeout(req, reject) {
    req.setTimeout(TIMEOUT_MS, () => {
        const err = new NetworkError_1.NetworkError('Connection timed out');
        err.code = NetworkError_1.NetworkErrorCode.TIMEOUT;
        reject(err);
        req.abort();
    });
}
//# sourceMappingURL=Request.js.map