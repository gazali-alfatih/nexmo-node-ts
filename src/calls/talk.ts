import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export const NexmoTalkEndPoint = new EndPoint(
  'api.nexmo.com',
  '/v1/calls/{{uuid}}/talk'
);

export class NexmoTalk {
  credential: Credentials;
  options: INexmoTalkOptions;

  static get ENDPOINT(): EndPoint {
    return NexmoTalkEndPoint;
  }

  static get RETRYPATHS(): Array<NexmoHost> {
    return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
  }

  constructor(credential: Credentials, options: INexmoTalkOptions) {
    this.credential = credential;
    this.options = Object.assign({ retry: true, limit: 10 }, options);
  }

  async start(
    callsId: string,
    params: INexmoTalkStartParams,
    retry: number = 0
  ): Promise<INexmoTalkStartResponse> {
    try {
      // update path according to retry
      NexmoTalk.ENDPOINT.host =
        NexmoTalk.RETRYPATHS[retry % NexmoTalk.RETRYPATHS.length];

      const body = JSON.stringify(
        Object.assign({ voice_name: 'Kimberly', loop: 1, level: 0 }, params)
      );
      const url = NexmoTalk.ENDPOINT.deserialize([
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
  ): Promise<INexmoTalkStopResponse> {
    try {
      // update path according to retry
      NexmoTalk.ENDPOINT.host =
        NexmoTalk.RETRYPATHS[retry % NexmoTalk.RETRYPATHS.length];

      const url = NexmoTalk.ENDPOINT.deserialize([
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

export default NexmoTalk;

// Types Declaration
export declare interface INexmoTalkOptions {
  retry: boolean;
  limit: number;
}

export declare type NexmoTalkVoiceName =
  | 'Salli'
  | 'Joey'
  | 'Naja'
  | 'Mads'
  | 'Marlene'
  | 'Hans'
  | 'Nicole'
  | 'Russell'
  | 'Amy'
  | 'Brian'
  | 'Emma'
  | 'Geraint'
  | 'Gwyneth'
  | 'Raveena'
  | 'Chipmunk'
  | 'Eric'
  | 'Ivy'
  | 'Jennifer'
  | 'Justin'
  | 'Kendra'
  | 'Kimberly'
  | 'Conchita'
  | 'Enrique'
  | 'Penelope'
  | 'Miguel'
  | 'Chantal'
  | 'Celine'
  | 'Mathieu'
  | 'Dora'
  | 'Karl'
  | 'Carla'
  | 'Giorgio'
  | 'Liv'
  | 'Lotte'
  | 'Ruben'
  | 'Agnieszka'
  | 'Jacek'
  | 'Ewa'
  | 'Jan'
  | 'Maja'
  | 'Vitoria'
  | 'Ricardo'
  | 'Cristiano'
  | 'Ines'
  | 'Carmen'
  | 'Maxim'
  | 'Tatyana'
  | 'Astrid'
  | 'Filiz'
  | 'Mizuki'
  | 'Seoyeon';

export declare interface INexmoTalkStartParams {
  text: string;
  voice_name?: NexmoTalkVoiceName;
  // 0 for infinite
  loop?: number;
  // -1 >= level <= 1
  level?: number;
}

export declare interface INexmoTalkStartResponse {
  message: string;
  uuid: string;
}

export declare interface INexmoTalkStopResponse {
  message: string;
  uuid: string;
}
