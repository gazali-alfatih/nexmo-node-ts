import Credentials, { INexmoCredential } from './credential';
import NexmoCalls from './calls';
export declare class Nexmo {
    credential: Credentials;
    calls: NexmoCalls;
    constructor(credential: Credentials | INexmoCredential);
}
export default Nexmo;
