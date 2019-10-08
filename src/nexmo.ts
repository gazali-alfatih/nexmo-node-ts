import Credentials, { INexmoCredential } from './credential';
import NexmoCalls from './calls';
import NexmoFiles from './files';

export class Nexmo {
  credential: Credentials;
  calls: NexmoCalls;
  files: NexmoFiles;

  constructor(credential: Credentials | INexmoCredential) {
    this.credential = Credentials.parse(credential);

    this.calls = new NexmoCalls(this.credential);
    this.files = new NexmoFiles(this.credential);
  }
}

export default Nexmo;
