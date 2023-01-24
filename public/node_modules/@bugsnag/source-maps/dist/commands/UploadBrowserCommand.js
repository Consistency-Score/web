"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const command_line_args_1 = __importDefault(require("command-line-args"));
const command_line_usage_1 = __importDefault(require("command-line-usage"));
const browser = __importStar(require("../uploaders/BrowserUploader"));
const Logger_1 = __importDefault(require("../Logger"));
const consola_1 = require("consola");
const CommandDefinitions_1 = require("./CommandDefinitions");
function uploadBrowser(argv, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const defs = [
            ...CommandDefinitions_1.commonCommandDefs,
            ...browserCommandCommonDefs,
            ...browserCommandSingleDefs,
            ...browserCommandMultipleDefs
        ];
        let browserOpts;
        try {
            browserOpts = command_line_args_1.default(defs, { argv, camelCase: true });
            if (opts.help)
                return browserUsage();
            if (browserOpts.quiet)
                Logger_1.default.level = consola_1.LogLevel.Success;
            validateBrowserOpts(browserOpts);
        }
        catch (e) {
            process.exitCode = 1;
            if (e.name === 'UNKNOWN_VALUE') {
                Logger_1.default.error(`Invalid argument provided. ${e.message}`);
                // Check if the user provided an argument that allows a wildcard ('*') and
                // if so, warn them about wrapping the value in quotes
                const wildcardArgument = argv.find(arg => arg === '--bundle-url' || arg === '--base-url');
                if (wildcardArgument) {
                    Logger_1.default.info(`Values that contain a wildcard must be wrapped in quotes to prevent shell expansion, for example ${wildcardArgument} "*"`);
                }
            }
            else {
                Logger_1.default.error(e.message);
            }
            return browserUsage();
        }
        try {
            if (browserOpts.sourceMap) {
                // single mode
                yield browser.uploadOne({
                    apiKey: browserOpts.apiKey,
                    sourceMap: browserOpts.sourceMap,
                    bundleUrl: browserOpts.bundleUrl,
                    bundle: browserOpts.bundle,
                    projectRoot: browserOpts.projectRoot,
                    overwrite: browserOpts.overwrite,
                    appVersion: browserOpts.appVersion,
                    endpoint: browserOpts.endpoint,
                    detectAppVersion: browserOpts.detectAppVersion,
                    logger: Logger_1.default
                });
            }
            else {
                // multiple mode
                yield browser.uploadMultiple({
                    apiKey: browserOpts.apiKey,
                    baseUrl: browserOpts.baseUrl,
                    directory: browserOpts.directory,
                    projectRoot: browserOpts.projectRoot,
                    overwrite: browserOpts.overwrite,
                    appVersion: browserOpts.appVersion,
                    endpoint: browserOpts.endpoint,
                    detectAppVersion: browserOpts.detectAppVersion,
                    logger: Logger_1.default
                });
            }
        }
        catch (e) {
            process.exitCode = 1;
        }
    });
}
exports.default = uploadBrowser;
function browserUsage() {
    console.log(command_line_usage_1.default([
        { content: 'bugsnag-source-maps upload-browser [...opts]' },
        {
            header: 'Options',
            optionList: [...CommandDefinitions_1.commonCommandDefs, ...browserCommandCommonDefs]
        },
        {
            header: 'Single upload',
            content: 'Options for uploading a source map for a single bundle'
        },
        {
            optionList: [...browserCommandSingleDefs]
        },
        {
            header: 'Multiple upload',
            content: 'Options for recursing directory and upload multiple source maps'
        },
        {
            optionList: [...browserCommandMultipleDefs]
        }
    ]));
}
const browserCommandCommonDefs = [
    {
        name: 'app-version',
        type: String
    },
    {
        name: 'detect-app-version',
        type: Boolean,
        description: 'detect the app version from the package.json file'
    }
];
const browserCommandSingleDefs = [
    {
        name: 'source-map',
        type: String,
        description: 'the path to the source map {bold required}',
        typeLabel: '{underline filepath}'
    },
    {
        name: 'bundle-url',
        type: String,
        description: 'the URL of the bundle file (may contain * wildcards) {bold required}',
        typeLabel: '{underline url}'
    },
    {
        name: 'bundle',
        type: String,
        description: 'the path to the bundle',
        typeLabel: '{underline filepath}'
    },
];
const browserCommandMultipleDefs = [
    {
        name: 'directory',
        type: String,
        description: 'the directory to start searching for source maps in, relative to the project root {bold required}',
        typeLabel: '{underline path}'
    },
    {
        name: 'base-url',
        type: String,
        description: 'the URL of the base directory that JS files are served from (may contain * wildcards) {bold required}',
        typeLabel: '{underline url}'
    },
];
function validateBrowserOpts(opts) {
    if (!opts['apiKey']) {
        throw new Error('--api-key is required');
    }
    if (opts['appVersion'] && opts['detectAppVersion']) {
        throw new Error('--app-version and --detect-app-version cannot both be given');
    }
    const anySingleSet = opts['sourceMap'] || opts['bundleUrl'] || opts['bundle'];
    const anyMultipleSet = opts['baseUrl'] || opts['directory'];
    if (anySingleSet && anyMultipleSet) {
        throw new Error('Incompatible options are set. Use either single mode options (--source-map, --bundle, --bundle-url) or multiple mode options (--directory, --base-url).');
    }
    if (!anySingleSet && !anyMultipleSet)
        throw new Error('Not enough options supplied');
    if (anySingleSet) {
        // single mode
        if (!opts['sourceMap'])
            throw new Error('--source-map is required');
        if (!opts['bundleUrl'])
            throw new Error('--bundle-url is required');
    }
    else {
        // multiple mode
        if (!opts['directory'])
            throw new Error('--directory is required');
        if (!opts['baseUrl'])
            throw new Error('--base-url is required');
    }
}
//# sourceMappingURL=UploadBrowserCommand.js.map