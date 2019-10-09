import * as fs from 'fs';
import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export const NexmoFilesEndPoint = new EndPoint('api.nexmo.com', '/v1/files');

export class NexmoFiles {
  credential: Credentials;
  options: INexmoFilesOptions;

  static get ENDPOINT(): EndPoint {
    return NexmoFilesEndPoint;
  }

  constructor(credential: Credentials, options: INexmoFilesOptions = {}) {
    this.credential = credential;
    this.options = Object.assign({}, options);
  }

  async get(fileIdOrUrl: string) {
    if (!fileIdOrUrl) {
      throw new Error('"fileIdOrUrl" is a required parameter');
    }

    const fileId = fileIdOrUrl.split('/').pop();
    const url = `${NexmoFiles.ENDPOINT.deserialize()}/${fileId}`;

    return HTTPClient.request(
      url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
          Authorization: `Bearer ${this.credential.generateJwt()}`
        }
      },
      this.credential
    );
  }

  async save(fileIdOrUrl: string, file: string) {
    const data = await HTTPClient.get(fileIdOrUrl, {}, this.credential);
    return this.store(data, file);
  }

  private async store(data: Buffer, file: string) {
    return fs.promises.writeFile(file, data);
  }
}

export default NexmoFiles;

// Types Declaration
export declare interface INexmoFilesOptions {}
