import { Logger } from '../../Logger';
export default function readBundleContent(bundlePath: string, basePath: string, sourceMapName: string, logger: Logger): Promise<[string, string]>;
