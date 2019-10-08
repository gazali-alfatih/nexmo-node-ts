export declare type NexmoHost =
  | 'rest.nexmo.com'
  | 'api.nexmo.com'
  | 'api-us-1.nexmo.com'
  | 'api-sg-1.nexmo.com';
export declare type NexmoSupportFormat = 'json' | 'xml';
export declare type NexmoSupportVerifyFunction = 'check' | 'search' | 'control';
export declare type NexmoSupportNumberInsight =
  | 'basic'
  | 'standard'
  | 'advanced'
  | 'advanced/async';
export declare type NexmoMapperKey = '{{format}}' | '{{type}}' | '{{uuid}}';

export declare type NexmoApplicationPath = '/v2/applications';
export declare type NexmoSMSPath = '/sms/{{format}}';
// | '/sms/json'
// | '/sms/xml'
export declare type NexmoUSShortCodePath = '/sc/us/{{type}}/{{format}}';
// | '/sc/us/2fa/json'
// | '/sc/us/alert/opt-in/query/json'
// | '/sc/us/alert/opt-in/manage/json'
// | '/sc/us/alert/json'
export declare type NexmoConversionPath = '/conversions/sms';
export declare type NexmoCallsPath = '/v1/calls';
export declare type NexmoVerifyPath = '/verify/{{format}}';
// | '/verify/json'
// | '/verify/xml'
export declare type NexmoVerifyFunctionPath = '/verify/{{type}}/{{format}}';
export declare type NexmoNumberInsightPath = '/ni/{{type}}/{{format}}';

export declare type NexmoPath =
  // api.nexmo.com
  | NexmoApplicationPath
  // rest.nexmo.com
  | NexmoSMSPath
  // rest.nexmo.com
  | NexmoUSShortCodePath
  // api.nexmo.com
  | NexmoConversionPath
  // api.nexmo.com
  | NexmoCallsPath
  // api.nexmo.com
  | NexmoVerifyPath
  // api.nexmo.com
  | NexmoVerifyFunctionPath
  // api.nexmo.com
  | NexmoNumberInsightPath
  // Allow Addtional Path
  | string;

export declare interface EndPointOptions {
  format?: NexmoSupportFormat;
  https?: boolean;
}

export class EndPoint {
  host: NexmoHost;
  path: NexmoPath;
  options: EndPointOptions;

  constructor(host: NexmoHost, path: NexmoPath, options?: EndPointOptions) {
    this.host = host;
    this.path = path;
    this.options = Object.assign({ format: 'json', https: true }, options);
  }

  deserialize(
    mapper: Array<{ key: NexmoMapperKey; value: string }> = []
  ): string {
    // Default Mapper
    mapper.push({ key: '{{format}}', value: String(this.options.format) });
    const protocol = this.options.https ? 'https' : 'http';
    const path = mapper.reduce(function(path, mapper) {
      return path.replace(mapper.key, mapper.value);
    }, this.path);
    return `${protocol}://${this.host}${path}`;
  }

  toJSON() {
    return Object.assign({}, this);
  }

  toString(): string {
    const protocol = this.options.https ? 'https' : 'http';
    return `${protocol}://${this.host}${this.path}`;
  }
}

export const defaultEndPoint = {
  calls: new EndPoint('api.nexmo.com', '/v1/calls')
};

export default EndPoint;
