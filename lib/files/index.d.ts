import EndPoint from '../endpoint';
import Credentials from '../credential';
export declare const NexmoFilesEndPoint: EndPoint;
export declare class NexmoFiles {
    credential: Credentials;
    options: INexmoFilesOptions;
    static readonly ENDPOINT: EndPoint;
    constructor(credential: Credentials, options?: INexmoFilesOptions);
    get(fileIdOrUrl: string): Promise<any>;
    save(fileIdOrUrl: string, file: string): Promise<void>;
    private store;
}
export default NexmoFiles;
export declare interface INexmoFilesOptions {
}
