"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseSourceMap(sourceMapContent, sourceMapPath, logger) {
    try {
        return JSON.parse(sourceMapContent);
    }
    catch (e) {
        logger.error(`The source map was not valid JSON.\n\n  "${sourceMapPath}"`);
        throw e;
    }
}
exports.default = parseSourceMap;
//# sourceMappingURL=ParseSourceMap.js.map