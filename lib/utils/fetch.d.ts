import { RequestInit, RequestInfo, Headers, Response } from 'node-fetch';
import Credentials from '../credential';
export { Headers, Response };
export declare const defaultHeaders: {
    'Content-Type': string;
    Accept: string;
};
export declare function request(url: RequestInfo, init: RequestInit, credential: Credentials, autoParseJson?: boolean, customResponseParser?: Function): Promise<any>;
export declare function get(url: string, params: any, credential: Credentials, useJwt?: boolean, useBasicAuth?: boolean): Promise<any>;
export declare function handleResponse(response: Response, request: RequestInit, autoParseJson?: boolean, customResponseParser?: Function): Promise<any>;
