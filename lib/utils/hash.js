"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var HashGenerator = /** @class */ (function () {
    function HashGenerator() {
    }
    HashGenerator.prototype.generate = function (method, secret, params) {
        params = params || {};
        var signedQuery = '';
        params = JSON.parse(JSON.stringify(params));
        if (params.sig)
            delete params.sig;
        signedQuery = Object.keys(params).reduce(function (signedQuery, key) {
            return (signedQuery += "&" + key + "=" + params[key].replace(/\&|\=/g, '_'));
        }, signedQuery);
        var hash = '';
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
                throw "Unknown signature algorithm: " + method + ". Expected: md5hash, md5, sha1, sha256, or sha512";
        }
        return hash;
    };
    return HashGenerator;
}());
exports.HashGenerator = HashGenerator;
exports.default = HashGenerator;
//# sourceMappingURL=hash.js.map