import Credentials, { INexmoCredential } from './credential';
import NexmoCalls from './calls';

export class Nexmo {
  credential: Credentials;
  calls: NexmoCalls;

  constructor(credential: Credentials | INexmoCredential) {
    this.credential = Credentials.parse(credential);

    this.calls = new NexmoCalls(this.credential);
  }
}

export default Nexmo;
