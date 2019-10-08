import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import * as HTTPClient from '../utils/fetch';

export class NexmoTalk {
  credential: Credentials;
  options: INexmoTalkOptions;

  static get ENDPOINT(): EndPoint {
    return new EndPoint('api.nexmo.com', '/v1/calls/{{uuid}}/talk');
  }

  static get RETRYPATHS(): Array<NexmoHost> {
    return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
  }

  constructor(credential: Credentials, options: INexmoTalkOptions) {
    this.credential = credential;
    this.options = Object.assign({ retry: true, limit: 10 }, options);
  }

  async start(
    callId: string,
    params: INexmoTalkStartParams
  ): Promise<INexmoTalkStartResponse> {
    const body = JSON.stringify(
      Object.assign({ voice_name: 'Kimberly', loop: 1, level: 0 }, params)
    );
    const url = NexmoTalk.ENDPOINT.deserialize([
      { key: '{{uuid}}', value: callId }
    ]);

    return await HTTPClient.request(
      url,
      {
        method: 'PUT',
        body: body,
        headers: new HTTPClient.Headers({
          'Content-Type': 'application/json',
          // 'Content-Length': Buffer.byteLength(params).toString(),
          Authorization: `Bearer ${this.credential.generateJwt()}`
        })
      },
      this.credential
    );
  }

  async stop(callId: string): Promise<INexmoTalkStopResponse> {
    const url = NexmoTalk.ENDPOINT.deserialize([
      { key: '{{uuid}}', value: callId }
    ]);

    return await HTTPClient.request(
      url,
      {
        method: 'DELETE',
        headers: new HTTPClient.Headers({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.credential.generateJwt()}`
        })
      },
      this.credential
    );
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
