"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var credential_1 = require("./credential");
var calls_1 = require("./calls");
var files_1 = require("./files");
var Nexmo = /** @class */ (function () {
    function Nexmo(credential) {
        this.credential = credential_1.default.parse(credential);
        this.calls = new calls_1.default(this.credential);
        this.files = new files_1.default(this.credential);
    }
    return Nexmo;
}());
exports.Nexmo = Nexmo;
exports.default = Nexmo;
//# sourceMappingURL=nexmo.js.map