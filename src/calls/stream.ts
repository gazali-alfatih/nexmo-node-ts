import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export const NexmoStreamEndPoint = new EndPoint(
  'api.nexmo.com',
  '/v1/calls/{{uuid}}/stream'
);

export class NexmoStream {
  credential: Credentials;
  options: INexmoStreamOptions;

  static get ENDPOINT(): EndPoint {
    return NexmoStreamEndPoint;
  }

  static get RETRYPATHS(): Array<NexmoHost> {
    return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
  }

  constructor(credential: Credentials, options: INexmoStreamOptions) {
    this.credential = credential;
    this.options = Object.assign({ retry: true, limit: 10 }, options);
  }

  async start(
    callsId: string,
    params: INexmoStreamStartParams,
    retry: number = 0
  ): Promise<INexmoStreamStartResponse> {
    try {
      // update path according to retry
      NexmoStream.ENDPOINT.host =
        NexmoStream.RETRYPATHS[retry % NexmoStream.RETRYPATHS.length];

      const body = JSON.stringify(Object.assign({ loop: 1, level: 0 }, params));
      const url = NexmoStream.ENDPOINT.deserialize([
        { key: '{{uuid}}', value: callsId }
      ]);

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
      if (
        Object.prototype.hasOwnProperty.call(res, 'type') &&
        res.type === 'NOT_FOUND'
      ) {
        throw res;
      }

      return res;
    } catch (err) {
      console.warn(err);
      // throw error when try limit is exceed
      if (retry + 1 >= this.options.limit) {
        throw new Error(err.message || err);
      }
      // retry if enabled
      if (this.options.retry) {
        return await this.start(callsId, params, retry + 1);
      }
      // throw err when all condition is not match
      throw err;
    }
  }

  async stop(
    callsId: string,
    retry: number = 0
  ): Promise<INexmoStreamStopResponse> {
    try {
      // update path according to retry
      NexmoStream.ENDPOINT.host =
        NexmoStream.RETRYPATHS[retry % NexmoStream.RETRYPATHS.length];

      const url = NexmoStream.ENDPOINT.deserialize([
        { key: '{{uuid}}', value: callsId }
      ]);

      const res = await HTTPClient.request(
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

      // Handle 404 Not Found
      // https://help.nexmo.com/hc/en-us/articles/115015969628-Why-do-I-get-a-404-when-trying-to-change-an-active-conversation-
      if (
        Object.prototype.hasOwnProperty.call(res, 'type') &&
        res.type === 'NOT_FOUND'
      ) {
        throw res;
      }

      return res;
    } catch (err) {
      console.warn(err);
      // throw error when try limit is exceed
      if (retry + 1 >= this.options.limit) {
        throw new Error(err.message || err);
      }
      // retry if enabled
      if (this.options.retry) {
        return await this.stop(callsId, retry + 1);
      }
      // throw err when all condition is not match
      throw err;
    }
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
