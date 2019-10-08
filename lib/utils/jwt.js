"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid = require("uuid");
var jwt = require("jsonwebtoken");
var JwtGenerator = /** @class */ (function () {
    function JwtGenerator() {
    }
    JwtGenerator.prototype.generate = function (certifate, claims) {
        if (claims === void 0) { claims = {}; }
        if (!(certifate instanceof Buffer)) {
            throw new Error('cert must be of type Buffer');
        }
        if (!(claims instanceof Object)) {
            throw new Error('claims must be of type object');
        }
        var payload = Object.assign({
            iat: parseInt(String(Date.now() / 1000), 10),
            jti: uuid.v1()
        }, claims);
        var token = jwt.sign(payload, certifate, { algorithm: 'RS256' });
        return token;
    };
    return JwtGenerator;
}());
exports.JwtGenerator = JwtGenerator;
exports.default = JwtGenerator;
//# sourceMappingURL=jwt.js.map