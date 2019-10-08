import Credentials from './credential';
import NexmoCalls from './calls';

export class Nexmo {
  credential: Credentials;
  calls: NexmoCalls;

  constructor(credential: Credentials) {
    this.credential = Credentials.parse(credential);

    this.calls = new NexmoCalls(credential);
  }
}

export default Nexmo;
