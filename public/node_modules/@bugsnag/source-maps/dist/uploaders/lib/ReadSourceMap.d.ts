import { Logger } from '../../Logger';
export default function readSourceMap(sourceMapPath: string, basePath: string, logger: Logger): Promise<[string, string]>;
