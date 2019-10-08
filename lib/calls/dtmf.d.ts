import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
export declare class NexmoDtmf {
    credential: Credentials;
    options: INexmoDtmfOptions;
    static readonly ENDPOINT: EndPoint;
    static readonly RETRYPATHS: Array<NexmoHost>;
    constructor(credential: Credentials, options: INexmoDtmfOptions);
    send(callId: string, params: INexmoDtmfParams, retry?: number): Promise<INexmoDtmfResponse>;
}
export default NexmoDtmf;
export declare interface INexmoDtmfOptions {
    retry: boolean;
    limit: number;
}
export declare interface INexmoDtmfParams {
    digits: string;
}
export declare interface INexmoDtmfResponse {
    message: string;
    uuid: string;
}
