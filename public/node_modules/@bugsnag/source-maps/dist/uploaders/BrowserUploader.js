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
exports.uploadMultiple = exports.uploadOne = void 0;
const path_1 = __importDefault(require("path"));
const glob_1 = __importDefault(require("glob"));
const Logger_1 = require("../Logger");
const File_1 = __importDefault(require("../File"));
const Request_1 = __importDefault(require("../Request"));
const FormatErrorLog_1 = __importDefault(require("./lib/FormatErrorLog"));
const ApplyTransformations_1 = __importDefault(require("./lib/ApplyTransformations"));
const ReadBundleContent_1 = __importDefault(require("./lib/ReadBundleContent"));
const ReadSourceMap_1 = __importDefault(require("./lib/ReadSourceMap"));
const ParseSourceMap_1 = __importDefault(require("./lib/ParseSourceMap"));
const DetectAppVersion_1 = __importDefault(require("./lib/DetectAppVersion"));
const EndpointUrl_1 = require("./lib/EndpointUrl");
const UPLOAD_PATH = '/sourcemap';
function uploadOne({ apiKey, bundleUrl, bundle, sourceMap, appVersion, codeBundleId, overwrite = false, projectRoot = process.cwd(), endpoint = EndpointUrl_1.DEFAULT_UPLOAD_ORIGIN, detectAppVersion = false, requestOpts = {}, logger = Logger_1.noopLogger }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(`Preparing upload of browser source map for "${bundleUrl}"`);
        let url;
        try {
            url = EndpointUrl_1.buildEndpointUrl(endpoint, UPLOAD_PATH);
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
        const [sourceMapContent, fullSourceMapPath] = yield ReadSourceMap_1.default(sourceMap, projectRoot, logger);
        let bundleContent;
        let fullBundlePath;
        if (bundle) {
            [bundleContent, fullBundlePath] = yield ReadBundleContent_1.default(bundle, projectRoot, sourceMap, logger);
        }
        const sourceMapJson = ParseSourceMap_1.default(sourceMapContent, sourceMap, logger);
        const transformedSourceMap = yield ApplyTransformations_1.default(fullSourceMapPath, sourceMapJson, projectRoot, logger);
        if (detectAppVersion) {
            try {
                appVersion = yield DetectAppVersion_1.default(projectRoot, logger);
            }
            catch (e) {
                logger.error(e.message);
                throw e;
            }
        }
        logger.debug(`Initiating upload to "${url}"`);
        const start = new Date().getTime();
        try {
            yield Request_1.default(url, {
                type: 0 /* Browser */,
                apiKey,
                appVersion: codeBundleId ? undefined : appVersion,
                codeBundleId,
                minifiedUrl: bundleUrl,
                minifiedFile: (bundleContent && fullBundlePath) ? new File_1.default(fullBundlePath, bundleContent) : undefined,
                sourceMap: new File_1.default(fullSourceMapPath, JSON.stringify(transformedSourceMap)),
                overwrite: overwrite
            }, requestOpts);
            const uploadedFiles = (bundleContent && fullBundlePath) ? `${sourceMap} and ${bundle}` : sourceMap;
            logger.success(`Success, uploaded ${uploadedFiles} to ${url} in ${(new Date()).getTime() - start}ms`);
        }
        catch (e) {
            if (e.cause) {
                logger.error(FormatErrorLog_1.default(e), e, e.cause);
            }
            else {
                logger.error(FormatErrorLog_1.default(e), e);
            }
            throw e;
        }
    });
}
exports.uploadOne = uploadOne;
function uploadMultiple({ apiKey, baseUrl, directory, appVersion, overwrite = false, detectAppVersion = false, projectRoot = process.cwd(), endpoint = EndpointUrl_1.DEFAULT_UPLOAD_ORIGIN, requestOpts = {}, logger = Logger_1.noopLogger }) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info(`Preparing upload of browser source maps for "${baseUrl}"`);
        let url;
        try {
            url = EndpointUrl_1.buildEndpointUrl(endpoint, UPLOAD_PATH);
        }
        catch (e) {
            logger.error(e);
            throw e;
        }
        logger.debug(`Searching for source maps "${directory}"`);
        const absoluteSearchPath = path_1.default.resolve(projectRoot, directory);
        const sourceMaps = yield new Promise((resolve, reject) => {
            glob_1.default('**/*.map', { ignore: '**/*.css.map', cwd: absoluteSearchPath }, (err, files) => {
                if (err)
                    return reject(err);
                resolve(files);
            });
        });
        if (sourceMaps.length === 0) {
            logger.warn('No source maps found.');
            return;
        }
        logger.debug(`Found ${sourceMaps.length} source map(s):`);
        logger.debug(`  ${sourceMaps.join(', ')}`);
        if (detectAppVersion) {
            try {
                appVersion = yield DetectAppVersion_1.default(projectRoot, logger);
            }
            catch (e) {
                logger.error(e.message);
                throw e;
            }
        }
        let n = 0;
        for (const sourceMap of sourceMaps) {
            n++;
            logger.info(`${n} of ${sourceMaps.length}`);
            const [sourceMapContent, fullSourceMapPath] = yield ReadSourceMap_1.default(sourceMap, absoluteSearchPath, logger);
            const sourceMapJson = ParseSourceMap_1.default(sourceMapContent, fullSourceMapPath, logger);
            const bundlePath = sourceMap.replace(/\.map$/, '');
            let bundleContent, fullBundlePath;
            try {
                [bundleContent, fullBundlePath] = yield ReadBundleContent_1.default(bundlePath, absoluteSearchPath, sourceMap, logger);
            }
            catch (e) {
                // bundle file is optional – ignore and carry on with the error logged out
            }
            const transformedSourceMap = yield ApplyTransformations_1.default(fullSourceMapPath, sourceMapJson, projectRoot, logger);
            logger.debug(`Initiating upload to "${url}"`);
            const start = new Date().getTime();
            try {
                yield Request_1.default(url, {
                    type: 0 /* Browser */,
                    apiKey,
                    appVersion,
                    minifiedUrl: `${baseUrl.replace(/\/$/, '')}/${bundlePath}`,
                    minifiedFile: (bundleContent && fullBundlePath) ? new File_1.default(fullBundlePath, bundleContent) : undefined,
                    sourceMap: new File_1.default(fullSourceMapPath, JSON.stringify(transformedSourceMap)),
                    overwrite: overwrite
                }, requestOpts);
                const uploadedFiles = (bundleContent && fullBundlePath) ? `${sourceMap} and ${bundlePath}` : sourceMap;
                logger.success(`Success, uploaded ${uploadedFiles} to ${url} in ${(new Date()).getTime() - start}ms`);
            }
            catch (e) {
                if (e.cause) {
                    logger.error(FormatErrorLog_1.default(e), e, e.cause);
                }
                else {
                    logger.error(FormatErrorLog_1.default(e), e);
                }
                throw e;
            }
        }
    });
}
exports.uploadMultiple = uploadMultiple;
//# sourceMappingURL=BrowserUploader.js.map