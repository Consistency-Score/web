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
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const StringifyFileAccessError_1 = __importDefault(require("./StringifyFileAccessError"));
function readBundleContent(bundlePath, basePath, sourceMapName, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const fullBundlePath = path_1.default.resolve(basePath, bundlePath);
        logger.debug(`Reading bundle file "${bundlePath}"`);
        try {
            return [yield fs_1.promises.readFile(fullBundlePath, 'utf-8'), fullBundlePath];
        }
        catch (e) {
            logger.error(`The bundle "${bundlePath}" could not be found. ${StringifyFileAccessError_1.default(e)}\n\n  "${fullBundlePath}"`);
            throw e;
        }
    });
}
exports.default = readBundleContent;
//# sourceMappingURL=ReadBundleContent.js.map