import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export class NexmoStream {
  credential: Credentials;
  options: INexmoStreamOptions;

  static get ENDPOINT(): EndPoint {
    return new EndPoint('api.nexmo.com', '/v1/calls/{{uuid}}/stream');
  }

  static get RETRYPATHS(): Array<NexmoHost> {
    return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
  }

  constructor(credential: Credentials, options: INexmoStreamOptions) {
    this.credential = credential;
    this.options = Object.assign({ retry: true, limit: 10 }, options);
  }

  async start(
    callId: string,
    params: INexmoStreamStartParams
  ): Promise<INexmoStreamStartResponse> {
    const body = JSON.stringify(Object.assign({ loop: 1, level: 0 }, params));
    const url = NexmoStream.ENDPOINT.deserialize([
      { key: '{{uuid}}', value: callId }
    ]);

    return await HTTPClient.request(
      url,
      {
        method: 'PUT',
        body: body,
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Length': Buffer.byteLength(params).toString(),
          Authorization: `Bearer ${this.credential.generateJwt()}`
        }
      },
      this.credential
    );
  }

  async stop(callId: string): Promise<INexmoStreamStopResponse> {
    const url = NexmoStream.ENDPOINT.deserialize([
      { key: '{{uuid}}', value: callId }
    ]);

    return await HTTPClient.request(
      url,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.credential.generateJwt()}`
        }
      },
      this.credential
    );
  }
}

export default NexmoStream;

// Types Declaration
export declare interface INexmoStreamOptions {
  retry: boolean;
  limit: number;
}

export declare interface INexmoStreamStartParams {
  stream_url: Array<string>;
  // 0 for infinite
  loop?: number;
  // -1 >= level <= 1
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
