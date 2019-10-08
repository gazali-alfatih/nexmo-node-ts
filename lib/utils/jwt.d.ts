/// <reference types="node" />
export declare class JwtGenerator {
    certifate: Buffer;
    claims: any;
    generate(certifate: Buffer, claims?: any): string;
}
export default JwtGenerator;
