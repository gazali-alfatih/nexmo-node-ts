import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
export declare const NexmoStreamEndPoint: EndPoint;
export declare class NexmoStream {
    credential: Credentials;
    options: INexmoStreamOptions;
    static readonly ENDPOINT: EndPoint;
    static readonly RETRYPATHS: Array<NexmoHost>;
    constructor(credential: Credentials, options: INexmoStreamOptions);
    start(callsId: string, params: INexmoStreamStartParams, retry?: number): Promise<INexmoStreamStartResponse>;
    stop(callsId: string, retry?: number): Promise<INexmoStreamStopResponse>;
}
export default NexmoStream;
export declare interface INexmoStreamOptions {
    retry: boolean;
    limit: number;
}
export declare interface INexmoStreamStartParams {
    stream_url: Array<string>;
    loop?: number;
    level?: number;
}
export declare interface INexmoStreamStartResponse {
    message: string;
    uuid: string;
}
export declare interface INexmoStreamStopResponse {
    message: string;
    uuid: string;
}
