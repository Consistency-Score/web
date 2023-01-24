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
const read_pkg_up_1 = __importDefault(require("read-pkg-up"));
function detectAppVersion(projectRoot, logger) {
    return __awaiter(this, void 0, void 0, function* () {
        const pkg = yield read_pkg_up_1.default({ cwd: projectRoot });
        const version = pkg === null || pkg === void 0 ? void 0 : pkg.packageJson.version;
        if (!version) {
            throw new Error('Unable to automatically detect app version. Provide the "--app-version" argument or add a "version" key to your package.json file.');
        }
        logger.debug(`Detected appVersion "${version}"`);
        return version;
    });
}
exports.default = detectAppVersion;
//# sourceMappingURL=DetectAppVersion.js.map