export declare type NexmoHost = 'rest.nexmo.com' | 'api.nexmo.com' | 'api-us-1.nexmo.com' | 'api-sg-1.nexmo.com';
export declare type NexmoSupportFormat = 'json' | 'xml';
export declare type NexmoSupportVerifyFunction = 'check' | 'search' | 'control';
export declare type NexmoSupportNumberInsight = 'basic' | 'standard' | 'advanced' | 'advanced/async';
export declare type NexmoMapperKey = '{{format}}' | '{{type}}' | '{{uuid}}';
export declare type NexmoApplicationPath = '/v2/applications';
export declare type NexmoSMSPath = '/sms/{{format}}';
export declare type NexmoUSShortCodePath = '/sc/us/{{type}}/{{format}}';
export declare type NexmoConversionPath = '/conversions/sms';
export declare type NexmoCallsPath = '/v1/calls';
export declare type NexmoVerifyPath = '/verify/{{format}}';
export declare type NexmoVerifyFunctionPath = '/verify/{{type}}/{{format}}';
export declare type NexmoNumberInsightPath = '/ni/{{type}}/{{format}}';
export declare type NexmoPath = NexmoApplicationPath | NexmoSMSPath | NexmoUSShortCodePath | NexmoConversionPath | NexmoCallsPath | NexmoVerifyPath | NexmoVerifyFunctionPath | NexmoNumberInsightPath | string;
export declare interface EndPointOptions {
    format?: NexmoSupportFormat;
    https?: boolean;
}
export declare class EndPoint {
    host: NexmoHost;
    path: NexmoPath;
    options: EndPointOptions;
    constructor(host: NexmoHost, path: NexmoPath, options?: EndPointOptions);
    deserialize(mapper?: Array<{
        key: NexmoMapperKey;
        value: string;
    }>): string;
    toJSON(): {} & this;
    toString(): string;
}
export declare const defaultEndPoint: {
    calls: EndPoint;
};
export default EndPoint;
