import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export class NexmoDtmf {
  credential: Credentials;
  options: INexmoDtmfOptions;

  static get ENDPOINT(): EndPoint {
    return new EndPoint('api.nexmo.com', '/v1/calls/{{uuid}}/dtmf');
  }

  static get RETRYPATHS(): Array<NexmoHost> {
    return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
  }

  constructor(credential: Credentials, options: INexmoDtmfOptions) {
    this.credential = credential;
    this.options = Object.assign({ retry: true, limit: 10 }, options);
  }

  async send(
    callId: string,
    params: INexmoDtmfParams,
    retry: number = 0
  ): Promise<INexmoDtmfResponse> {
    try {
      const body = JSON.stringify(params);
      const url = NexmoDtmf.ENDPOINT.deserialize([
        { key: '{{uuid}}', value: callId }
      ]);

      // use alternative path when retry
      if (retry > 0) {
        url.replace(
          NexmoDtmf.ENDPOINT.path,
          NexmoDtmf.RETRYPATHS[retry % NexmoDtmf.RETRYPATHS.length]
        );
      }

      const res = await HTTPClient.request(
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

      // Handle 404 Not Found
      // https://help.nexmo.com/hc/en-us/articles/115015969628-Why-do-I-get-a-404-when-trying-to-change-an-active-conversation-
      if(Object.prototype.hasOwnProperty.call(res, 'type') && res.type === 'NOT_FOUND') {
        throw res
      }

      return res
    } catch (err) {
      console.warn(err);
      // throw error when try limit is exceed
      if (retry + 1 >= this.options.limit) {
        throw new Error(err.message || err);
      }
      // retry send dtmf if retry is enabled
      if (this.options.retry) {
        return await this.send(callId, params, retry + 1);
      }
      // throw err when all condition is not match
      throw err;
    }
  }
}

export default NexmoDtmf;

// Types Declaration
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
