/// <reference types="node" />
import http from 'http';
import { Logger } from '../Logger';
interface UploadSingleOpts {
    apiKey: string;
    sourceMap: string;
    bundleUrl: string;
    bundle?: string;
    appVersion?: string;
    codeBundleId?: string;
    overwrite?: boolean;
    projectRoot?: string;
    endpoint?: string;
    detectAppVersion?: boolean;
    requestOpts?: http.RequestOptions;
    logger?: Logger;
}
export declare function uploadOne({ apiKey, bundleUrl, bundle, sourceMap, appVersion, codeBundleId, overwrite, projectRoot, endpoint, detectAppVersion, requestOpts, logger }: UploadSingleOpts): Promise<void>;
interface UploadMultipleOpts {
    apiKey: string;
    baseUrl: string;
    directory: string;
    appVersion?: string;
    overwrite?: boolean;
    projectRoot?: string;
    endpoint?: string;
    detectAppVersion?: boolean;
    requestOpts?: http.RequestOptions;
    logger?: Logger;
}
export declare function uploadMultiple({ apiKey, baseUrl, directory, appVersion, overwrite, detectAppVersion, projectRoot, endpoint, requestOpts, logger }: UploadMultipleOpts): Promise<void>;
export {};
