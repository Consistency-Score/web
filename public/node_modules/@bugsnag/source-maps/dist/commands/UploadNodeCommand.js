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
const node = __importStar(require("../uploaders/NodeUploader"));
const Logger_1 = __importDefault(require("../Logger"));
const consola_1 = require("consola");
const CommandDefinitions_1 = require("./CommandDefinitions");
function uploadNode(argv, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        const defs = [
            ...CommandDefinitions_1.commonCommandDefs,
            ...nodeCommandCommonDefs,
            ...nodeCommandSingleDefs,
            ...nodeCommandMultipleDefs
        ];
        let nodeOpts;
        try {
            nodeOpts = command_line_args_1.default(defs, { argv, camelCase: true });
            if (opts.help)
                return nodeUsage();
            if (nodeOpts.quiet)
                Logger_1.default.level = consola_1.LogLevel.Success;
            validatenodeOpts(nodeOpts);
        }
        catch (e) {
            process.exitCode = 1;
            if (e.name === 'UNKNOWN_VALUE') {
                Logger_1.default.error(`Invalid argument provided. ${e.message}`);
            }
            else {
                Logger_1.default.error(e.message);
            }
            return nodeUsage();
        }
        try {
            if (nodeOpts.sourceMap) {
                // single mode
                yield node.uploadOne({
                    apiKey: nodeOpts.apiKey,
                    sourceMap: nodeOpts.sourceMap,
                    bundle: nodeOpts.bundle,
                    projectRoot: nodeOpts.projectRoot,
                    overwrite: nodeOpts.overwrite,
                    appVersion: nodeOpts.appVersion,
                    endpoint: nodeOpts.endpoint,
                    detectAppVersion: nodeOpts.detectAppVersion,
                    logger: Logger_1.default
                });
            }
            else {
                // multiple mode
                yield node.uploadMultiple({
                    apiKey: nodeOpts.apiKey,
                    directory: nodeOpts.directory,
                    projectRoot: nodeOpts.projectRoot,
                    overwrite: nodeOpts.overwrite,
                    appVersion: nodeOpts.appVersion,
                    endpoint: nodeOpts.endpoint,
                    detectAppVersion: nodeOpts.detectAppVersion,
                    logger: Logger_1.default
                });
            }
        }
        catch (e) {
            process.exitCode = 1;
        }
    });
}
exports.default = uploadNode;
function nodeUsage() {
    console.log(command_line_usage_1.default([
        { content: 'bugsnag-source-maps upload-node [...opts]' },
        {
            header: 'Options',
            optionList: [...CommandDefinitions_1.commonCommandDefs, ...nodeCommandCommonDefs]
        },
        {
            header: 'Single upload',
            content: 'Options for uploading a source map for a single bundle'
        },
        {
            optionList: [...nodeCommandSingleDefs]
        },
        {
            header: 'Multiple upload',
            content: 'Options for recursing directory and upload multiple source maps'
        },
        {
            optionList: [...nodeCommandMultipleDefs]
        }
    ]));
}
const nodeCommandCommonDefs = [
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
const nodeCommandSingleDefs = [
    {
        name: 'source-map',
        type: String,
        description: 'the path to the source map {bold required}',
        typeLabel: '{underline filepath}'
    },
    {
        name: 'bundle',
        type: String,
        description: 'the path to the bundle {bold required}',
        typeLabel: '{underline filepath}'
    }
];
const nodeCommandMultipleDefs = [
    {
        name: 'directory',
        type: String,
        description: 'the directory to start searching for source maps in, relative to the project root {bold required}',
        typeLabel: '{underline path}'
    }
];
function validatenodeOpts(opts) {
    if (!opts['apiKey']) {
        throw new Error('--api-key is required');
    }
    if (opts['appVersion'] && opts['detectAppVersion']) {
        throw new Error('--app-version and --detect-app-version cannot both be given');
    }
    const anySingleSet = opts['sourceMap'] || opts['bundle'];
    const anyMultipleSet = opts['directory'];
    if (anySingleSet && anyMultipleSet) {
        throw new Error('Incompatible options are set. Use either single mode options (--source-map, --bundle) or multiple mode options (--directory).');
    }
    if (!anySingleSet && !anyMultipleSet)
        throw new Error('Not enough options supplied');
    if (anySingleSet) {
        // single mode
        if (!opts['sourceMap'])
            throw new Error('--source-map is required');
        if (!opts['bundle'])
            throw new Error('--bundle is required');
    }
}
//# sourceMappingURL=UploadNodeCommand.js.map