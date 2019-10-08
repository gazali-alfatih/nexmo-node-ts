/// <reference types="node" />
import { HashMethod } from './utils/hash';
export declare class Credentials {
    apiKey: string;
    apiSecret: string;
    applicationId: string;
    privateKey: any;
    signatureSecret: string;
    signatureMethod: HashMethod;
    private _jwtGenerator;
    private _hashGenerator;
    constructor(apiKey: string, apiSecret: string, applicationId?: string, privateKey?: string | Buffer, signatureSecret?: string, signatureMethod?: HashMethod);
    generateJwt(applicationId?: string, privateKey?: Buffer): string;
    generateSignature(params: any, signatureSecret?: string, signatureMethod?: HashMethod): string;
    private _setJwtGenerator;
    private _setHashGenerator;
    static parse(obj: INexmoCredential): Credentials;
}
export default Credentials;
export declare interface INexmoCredential {
    apiKey: string;
    apiSecret: string;
    applicationId?: string;
    privateKey?: any;
    signatureSecret?: string;
    signatureMethod?: HashMethod;
}
