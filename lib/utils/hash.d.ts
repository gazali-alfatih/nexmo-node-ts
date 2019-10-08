export declare type HashMethod = 'md5hash' | 'md5' | 'sha1' | 'sha256' | 'sha512';
export declare class HashGenerator {
    generate(method: HashMethod, secret: string, params?: any): string;
}
export default HashGenerator;
