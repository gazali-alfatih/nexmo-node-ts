import * as crypto from 'crypto';

export declare type HashMethod =
  | 'md5hash'
  | 'md5'
  | 'sha1'
  | 'sha256'
  | 'sha512';

export class HashGenerator {
  generate(method: HashMethod, secret: string, params?: any) {
    params = params || {};
    let signedQuery = '';

    params = JSON.parse(JSON.stringify(params));

    if (params.sig) delete params.sig;

    signedQuery = Object.keys(params).reduce(function(
      signedQuery: string,
      key: string
    ) {
      return (signedQuery += `&${key}=${params[key].replace(/\&|\=/g, '_')}`);
    },
    signedQuery);

    let hash = '';

    switch (method) {
      case 'md5hash':
        signedQuery += secret;
        hash = crypto
          .createHash('md5')
          .update(signedQuery)
          .digest('hex');
        break;
      case 'md5':
      case 'sha1':
      case 'sha256':
      case 'sha512':
        hash = crypto
          .createHmac(method, secret)
          .update(signedQuery)
          .digest('hex');
        break;

      default:
        throw `Unknown signature algorithm: ${method}. Expected: md5hash, md5, sha1, sha256, or sha512`;
    }

    return hash;
  }
}

export default HashGenerator;
