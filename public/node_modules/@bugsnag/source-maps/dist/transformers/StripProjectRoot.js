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
function stripProjectRoot(sourceMapPath, sourceMap, projectRoot, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.debug('Stripping project root from sources');
        if (!sourceMap || typeof sourceMap !== 'object')
            return sourceMap;
        const maybeSourceMap = sourceMap;
        if (maybeSourceMap.sections) {
            for (const section of maybeSourceMap.sections) {
                if (section.map)
                    strip(sourceMapPath, section.map, projectRoot);
            }
        }
        else {
            strip(sourceMapPath, maybeSourceMap, projectRoot);
        }
        return maybeSourceMap;
    });
}
exports.default = stripProjectRoot;
function strip(sourceMapPath, map, projectRoot) {
    if (!map.sources)
        return;
    map.sources = map.sources.map(s => {
        if (/^webpack:\/\/\/webpack/.test(s))
            return s;
        const absoluteSourcePath = path_1.default.resolve(path_1.default.dirname(sourceMapPath), s.replace(/webpack:\/\/\/\.\//, `${projectRoot}/`));
        return absoluteSourcePath.replace(projectRoot, '').replace(/^\//, '');
    });
}
//# sourceMappingURL=StripProjectRoot.js.map