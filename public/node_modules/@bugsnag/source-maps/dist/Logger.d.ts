import consolaGlobalInstance, { LogLevel } from 'consola';
export default consolaGlobalInstance;
export declare type Logger = {
    trace: (...args: unknown[]) => void;
    debug: (...args: unknown[]) => void;
    info: (...args: unknown[]) => void;
    success: (...args: unknown[]) => void;
    warn: (...args: unknown[]) => void;
    error: (...args: unknown[]) => void;
    fatal: (...args: unknown[]) => void;
    level: LogLevel;
};
export declare const noopLogger: Logger;
