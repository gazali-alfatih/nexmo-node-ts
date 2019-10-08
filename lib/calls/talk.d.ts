import EndPoint, { NexmoHost } from '../endpoint';
import Credentials from '../credential';
export declare class NexmoTalk {
    credential: Credentials;
    options: INexmoTalkOptions;
    static readonly ENDPOINT: EndPoint;
    static readonly RETRYPATHS: Array<NexmoHost>;
    constructor(credential: Credentials, options: INexmoTalkOptions);
    start(callId: string, params: INexmoTalkStartParams): Promise<INexmoTalkStartResponse>;
    stop(callId: string): Promise<INexmoTalkStopResponse>;
}
export default NexmoTalk;
export declare interface INexmoTalkOptions {
    retry: boolean;
    limit: number;
}
export declare type NexmoTalkVoiceName = 'Salli' | 'Joey' | 'Naja' | 'Mads' | 'Marlene' | 'Hans' | 'Nicole' | 'Russell' | 'Amy' | 'Brian' | 'Emma' | 'Geraint' | 'Gwyneth' | 'Raveena' | 'Chipmunk' | 'Eric' | 'Ivy' | 'Jennifer' | 'Justin' | 'Kendra' | 'Kimberly' | 'Conchita' | 'Enrique' | 'Penelope' | 'Miguel' | 'Chantal' | 'Celine' | 'Mathieu' | 'Dora' | 'Karl' | 'Carla' | 'Giorgio' | 'Liv' | 'Lotte' | 'Ruben' | 'Agnieszka' | 'Jacek' | 'Ewa' | 'Jan' | 'Maja' | 'Vitoria' | 'Ricardo' | 'Cristiano' | 'Ines' | 'Carmen' | 'Maxim' | 'Tatyana' | 'Astrid' | 'Filiz' | 'Mizuki' | 'Seoyeon';
export declare interface INexmoTalkStartParams {
    text: string;
    voice_name?: NexmoTalkVoiceName;
    loop?: number;
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
