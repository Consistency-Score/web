/// <reference types="node" />
import http from 'http';
import { Logger } from '../Logger';
interface UploadSingleOpts {
    apiKey: string;
    sourceMap: string;
    bundle: string;
    appVersion?: string;
    overwrite?: boolean;
    projectRoot?: string;
    endpoint?: string;
    detectAppVersion?: boolean;
    requestOpts?: http.RequestOptions;
    logger?: Logger;
}
export declare function uploadOne({ apiKey, bundle, sourceMap, appVersion, overwrite, projectRoot, endpoint, detectAppVersion, requestOpts, logger }: UploadSingleOpts): Promise<void>;
interface UploadMultipleOpts {
    apiKey: string;
    directory: string;
    appVersion?: string;
    overwrite?: boolean;
    projectRoot?: string;
    endpoint?: string;
    detectAppVersion?: boolean;
    requestOpts?: http.RequestOptions;
    logger?: Logger;
}
export declare function uploadMultiple({ apiKey, directory, appVersion, overwrite, projectRoot, endpoint, detectAppVersion, requestOpts, logger }: UploadMultipleOpts): Promise<void>;
export {};
