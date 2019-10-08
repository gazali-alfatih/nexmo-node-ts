import Credentials from './credential';
import NexmoCalls from './calls';
export declare class Nexmo {
    credential: Credentials;
    calls: NexmoCalls;
    constructor(credential: Credentials);
}
export default Nexmo;
