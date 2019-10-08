"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var EndPoint = /** @class */ (function () {
    function EndPoint(host, path, options) {
        this.host = host;
        this.path = path;
        this.options = Object.assign({ format: 'json', https: true }, options);
    }
    EndPoint.prototype.deserialize = function (mapper) {
        if (mapper === void 0) { mapper = []; }
        // Default Mapper
        mapper.push({ key: '{{format}}', value: String(this.options.format) });
        var protocol = this.options.https ? 'https' : 'http';
        var path = mapper.reduce(function (path, mapper) {
            return path.replace(mapper.key, mapper.value);
        }, this.path);
        return protocol + "://" + this.host + path;
    };
    EndPoint.prototype.toJSON = function () {
        return Object.assign({}, this);
    };
    EndPoint.prototype.toString = function () {
        var protocol = this.options.https ? 'https' : 'http';
        return protocol + "://" + this.host + this.path;
    };
    return EndPoint;
}());
exports.EndPoint = EndPoint;
exports.defaultEndPoint = {
    calls: new EndPoint('api.nexmo.com', '/v1/calls')
};
exports.default = EndPoint;
//# sourceMappingURL=endpoint.js.map