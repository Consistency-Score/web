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
const AddSources_1 = __importDefault(require("../../transformers/AddSources"));
const StripProjectRoot_1 = __importDefault(require("../../transformers/StripProjectRoot"));
function applyTransformations(fullSourceMapPath, sourceMapJson, projectRoot, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        logger.info('Applying transformations to source map');
        try {
            return yield Promise.resolve(sourceMapJson)
                .then(json => AddSources_1.default(fullSourceMapPath, json, projectRoot, logger))
                .then(json => StripProjectRoot_1.default(fullSourceMapPath, json, projectRoot, logger));
        }
        catch (e) {
            logger.error('Error applying transforms to source map', e);
            throw e;
        }
    });
}
exports.default = applyTransformations;
//# sourceMappingURL=ApplyTransformations.js.map