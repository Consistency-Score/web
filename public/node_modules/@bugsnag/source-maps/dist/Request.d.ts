/// <reference types="node" />
import http from 'http';
import File from './File';
export declare const enum PayloadType {
    Browser = 0,
    ReactNative = 1,
    Node = 2
}
declare type Payload = BrowserPayload | ReactNativePayload | NodePayload;
declare type BrowserPayload = JsPayload;
declare type NodePayload = JsPayload;
interface JsPayload {
    type: PayloadType.Node | PayloadType.Browser;
    apiKey: string;
    appVersion?: string;
    codeBundleId?: string;
    minifiedUrl: string;
    sourceMap: File;
    minifiedFile?: File;
    overwrite?: boolean;
}
interface ReactNativePayload {
    type: PayloadType.ReactNative;
    apiKey: string;
    platform: 'ios' | 'android';
    appVersion?: string;
    codeBundleId?: string;
    appBundleVersion?: string;
    appVersionCode?: string;
    overwrite: boolean;
    dev: boolean;
    sourceMap: File;
    bundle: File;
}
export default function request(endpoint: string, payload: Payload, requestOpts: http.RequestOptions): Promise<void>;
export declare function send(endpoint: string, payload: Payload, requestOpts: http.RequestOptions): Promise<void>;
export declare function isRetryable(status?: number): boolean;
export declare function fetch(endpoint: string): Promise<string>;
export {};
