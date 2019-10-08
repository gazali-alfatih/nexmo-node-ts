import Credentials, { INexmoCredential } from './credential';
import NexmoCalls from './calls';
import NexmoFiles from './files';
export declare class Nexmo {
    credential: Credentials;
    calls: NexmoCalls;
    files: NexmoFiles;
    constructor(credential: Credentials | INexmoCredential);
}
export default Nexmo;
