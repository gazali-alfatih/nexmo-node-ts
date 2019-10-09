"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var endpoint_1 = require("../endpoint");
var HTTPClient = require("../utils/fetch");
var NexmoDtmfEndPoint = new endpoint_1.default('api.nexmo.com', '/v1/calls/{{uuid}}/dtmf');
var NexmoDtmf = /** @class */ (function () {
    function NexmoDtmf(credential, options) {
        this.credential = credential;
        this.options = Object.assign({ retry: true, limit: 10 }, options);
    }
    Object.defineProperty(NexmoDtmf, "ENDPOINT", {
        get: function () {
            return NexmoDtmfEndPoint;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NexmoDtmf, "RETRYPATHS", {
        get: function () {
            return ['api.nexmo.com', 'api-sg-1.nexmo.com', 'api-us-1.nexmo.com'];
        },
        enumerable: true,
        configurable: true
    });
    NexmoDtmf.prototype.send = function (callsId, params, retry) {
        if (retry === void 0) { retry = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var body, url, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 5]);
                        // update path according to retry
                        NexmoDtmf.ENDPOINT.host =
                            NexmoDtmf.RETRYPATHS[retry % NexmoDtmf.RETRYPATHS.length];
                        body = JSON.stringify(params);
                        url = NexmoDtmf.ENDPOINT.deserialize([
                            { key: '{{uuid}}', value: callsId }
                        ]);
                        return [4 /*yield*/, HTTPClient.request(url, {
                                method: 'PUT',
                                body: body,
                                headers: {
                                    'Content-Type': 'application/json',
                                    // 'Content-Length': Buffer.byteLength(params).toString(),
                                    Authorization: "Bearer " + this.credential.generateJwt()
                                }
                            }, this.credential)];
                    case 1:
                        res = _a.sent();
                        // Handle 404 Not Found
                        // https://help.nexmo.com/hc/en-us/articles/115015969628-Why-do-I-get-a-404-when-trying-to-change-an-active-conversation-
                        if (Object.prototype.hasOwnProperty.call(res, 'type') &&
                            res.type === 'NOT_FOUND') {
                            throw res;
                        }
                        return [2 /*return*/, res];
                    case 2:
                        err_1 = _a.sent();
                        console.warn(err_1);
                        // throw error when try limit is exceed
                        if (retry + 1 >= this.options.limit) {
                            throw new Error(err_1.message || err_1);
                        }
                        if (!this.options.retry) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.send(callsId, params, retry + 1)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: 
                    // throw err when all condition is not match
                    throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return NexmoDtmf;
}());
exports.NexmoDtmf = NexmoDtmf;
exports.default = NexmoDtmf;
//# sourceMappingURL=dtmf.js.map