import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
import NexmoDtmf from './dtmf';
import NexmoStream from './stream';
import NexmoTalk from './talk';
export declare class NexmoCalls {
    credential: Credentials;
    options: INexmoCallsOptions;
    dtmf: NexmoDtmf;
    stream: NexmoStream;
    talk: NexmoTalk;
    static readonly ENDPOINT: EndPoint;
    static readonly RETRYPATHS: Array<NexmoHost>;
    constructor(credential: Credentials, options?: INexmoCallsOptions);
    create(params: INexmoCallsCreateParams): Promise<INexmoCallsCreateResponse>;
    get(query: INexmoCallsGetQuery | string): Promise<INexmoCallsGetResponse | INexmoCallsObject>;
    update(callsId: string, params: INexmoCallsUpdateParams): Promise<null>;
}
export default NexmoCalls;
export declare interface INexmoCallsObject {
    _links: {
        self: {
            href: string;
        };
    };
    uuid: string;
    conversation_uuid: string;
    to: INexmoCallsCreateToPSTN | INexmoCallsCreateToSIP | INexmoCallsCreateToWebsocket | INexmoCallsCreateToVBC;
    from: INexmoCallsCreateToPSTN;
    status: NexmoCallsType;
    direction: 'inbound' | 'outbound';
    rate: number;
    price: number;
    duration: number;
    start_time: string | Date;
    end_time: string | Date;
    network: number;
}
export declare type NexmoCallsType = 'started' | 'ringing' | 'answered' | 'machine' | 'completed' | 'busy' | 'cancelled' | 'failed' | 'rejected' | 'timeout' | 'unanswered';
export declare interface INexmoCallsOptions {
    retry: boolean;
    limit: number;
}
export declare interface INexmoCallsCreateToPSTN {
    type: 'phone' | 'sip' | 'websocket' | 'vbc';
    number: string;
    dtmfAnswer: string;
}
export declare interface INexmoCallsCreateToSIP {
    type: 'phone' | 'sip' | 'websocket' | 'vbc';
    uri: string;
}
export declare interface INexmoCallsCreateToWebsocket {
    type: 'phone' | 'sip' | 'websocket' | 'vbc';
    uri: string;
    'content-type': 'audio/l16;rate=8000' | 'audio/l16;rate=16000';
    headers: {
        customer_id: string;
    };
}
export declare interface INexmoCallsCreateToVBC {
    type: 'phone' | 'sip' | 'websocket' | 'vbc';
    extension: string;
}
export declare interface INexmoCallsCreateParams {
    to: INexmoCallsCreateToPSTN | INexmoCallsCreateToSIP | INexmoCallsCreateToWebsocket | INexmoCallsCreateToVBC;
    from: INexmoCallsCreateToPSTN;
    ncco?: Array<string>;
    answer_url?: Array<string>;
    answer_method?: 'GET' | 'POST';
    event_url: Array<string>;
    event_method?: 'GET' | 'POST';
    machine_detection?: 'continue' | 'hangup';
    length_timer?: number;
    ringing_timer?: number;
}
export declare interface INexmoCallsCreateResponse {
    uuid: string;
    status: 'started';
    direction: 'outbound';
    conversation_uuid: string;
}
export declare interface INexmoCallsGetQuery {
    status?: NexmoCallsType;
    date_start?: string | Date;
    date_end?: string | Date;
    page_size?: number;
    record_index?: number;
    order?: string;
    conversation_uuid?: string;
}
export declare interface INexmoCallsGetResponse {
    count: number;
    page_size: number;
    record_index: number;
    _links: {
        self: {
            href: string;
        };
    };
    _embedded: {
        calls: Array<INexmoCallsObject>;
    };
}
export declare interface INexmoCallsUpdateParams {
    action: 'hangup' | 'mute' | 'unmute' | 'earmuff' | 'unearmuff' | 'transfer';
    destination?: {
        type: 'ncco';
        url: Array<string>;
        ncco: Array<{
            [key: string]: string;
        }>;
    };
}
