"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildEndpointUrl = exports.DEFAULT_UPLOAD_ORIGIN = void 0;
exports.DEFAULT_UPLOAD_ORIGIN = 'https://upload.bugsnag.com';
function buildEndpointUrl(origin, path) {
    const url = new URL(origin);
    // if no path was given use the default
    if (url.pathname === '/') {
        url.pathname = path;
    }
    return url.toString();
}
exports.buildEndpointUrl = buildEndpointUrl;
//# sourceMappingURL=EndpointUrl.js.map