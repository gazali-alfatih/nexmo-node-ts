"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var jwt_1 = require("./utils/jwt");
var hash_1 = require("./utils/hash");
var Credentials = /** @class */ (function () {
    function Credentials(apiKey, apiSecret, applicationId, privateKey, signatureSecret, signatureMethod) {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;
        this.privateKey = undefined;
        if (applicationId)
            this.applicationId = applicationId;
        if (signatureSecret)
            this.signatureSecret = signatureSecret;
        if (signatureMethod)
            this.signatureMethod = signatureMethod;
        if (privateKey instanceof Buffer) {
            this.privateKey = privateKey;
        }
        else if (typeof privateKey === 'string' &&
            privateKey.startsWith('-----BEGIN PRIVATE KEY-----')) {
            this.privateKey = Buffer.from(privateKey);
        }
        else if (privateKey !== undefined) {
            if (!fs.existsSync(privateKey)) {
                throw new Error("File \"" + privateKey + "\" not found.");
            }
            this.privateKey = fs.readFileSync(privateKey);
        }
        this._jwtGenerator = new jwt_1.default();
        this._hashGenerator = new hash_1.default();
    }
    Credentials.prototype.generateJwt = function (applicationId, privateKey) {
        if (applicationId === void 0) { applicationId = this.applicationId; }
        if (privateKey === void 0) { privateKey = this.privateKey; }
        var claims = {
            application_id: applicationId
        };
        var token = this._jwtGenerator.generate(privateKey, claims);
        return token;
    };
    Credentials.prototype.generateSignature = function (params, signatureSecret, signatureMethod) {
        if (signatureSecret === void 0) { signatureSecret = this.signatureSecret; }
        if (signatureMethod === void 0) { signatureMethod = this.signatureMethod; }
        return this._hashGenerator.generate(signatureMethod, signatureSecret, params);
    };
    Credentials.prototype._setJwtGenerator = function (generator) {
        this._jwtGenerator = generator;
    };
    Credentials.prototype._setHashGenerator = function (generator) {
        this._hashGenerator = generator;
    };
    Credentials.parse = function (obj) {
        if (obj instanceof Credentials) {
            return obj;
        }
        else {
            return new Credentials(obj.apiKey, obj.apiSecret, obj.applicationId, obj.privateKey, obj.signatureSecret, obj.signatureMethod);
        }
    };
    return Credentials;
}());
exports.Credentials = Credentials;
exports.default = Credentials;
//# sourceMappingURL=credential.js.map