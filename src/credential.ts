import * as fs from 'fs';
import JwtGenerator from './utils/jwt';
import HashGenerator, { HashMethod } from './utils/hash';

export class Credentials {
  apiKey: string;
  apiSecret: string;
  applicationId: string;
  privateKey: any;
  signatureSecret: string;
  signatureMethod: HashMethod;

  private _jwtGenerator: JwtGenerator;
  private _hashGenerator: HashGenerator;

  constructor(
    apiKey: string,
    apiSecret: string,
    applicationId?: string,
    privateKey?: string | Buffer,
    signatureSecret?: string,
    signatureMethod?: HashMethod
  ) {
    this.apiKey = apiKey;
    this.apiSecret = apiSecret;

    this.privateKey = undefined;
    if (applicationId) this.applicationId = applicationId;

    if (signatureSecret) this.signatureSecret = signatureSecret;
    if (signatureMethod) this.signatureMethod = signatureMethod;

    if (privateKey instanceof Buffer) {
      this.privateKey = privateKey;
    } else if (
      typeof privateKey === 'string' &&
      privateKey.startsWith('-----BEGIN PRIVATE KEY-----')
    ) {
      this.privateKey = Buffer.from(privateKey);
    } else if (privateKey !== undefined) {
      if (!fs.existsSync(privateKey)) {
        throw new Error(`File "${privateKey}" not found.`);
      }
      this.privateKey = fs.readFileSync(privateKey);
    }

    this._jwtGenerator = new JwtGenerator();
    this._hashGenerator = new HashGenerator();
  }

  generateJwt(
    applicationId = this.applicationId,
    privateKey: Buffer = this.privateKey
  ) {
    const claims = {
      application_id: applicationId
    };
    const token = this._jwtGenerator.generate(privateKey, claims);
    return token;
  }

  generateSignature(
    params: any,
    signatureSecret: string = this.signatureSecret,
    signatureMethod: HashMethod = this.signatureMethod
  ) {
    return this._hashGenerator.generate(
      signatureMethod,
      signatureSecret,
      params
    );
  }

  private _setJwtGenerator(generator: JwtGenerator) {
    this._jwtGenerator = generator;
  }

  private _setHashGenerator(generator: HashGenerator) {
    this._hashGenerator = generator;
  }

  static parse(obj: any) {
    if (obj instanceof Credentials) {
      return obj;
    } else {
      return new Credentials(
        obj.apiKey,
        obj.apiSecret,
        obj.privateKey,
        obj.applicationId,
        obj.signatureSecret,
        obj.signatureMethod
      );
    }
  }
}

export default Credentials;
