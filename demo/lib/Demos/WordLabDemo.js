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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
require("isomorphic-fetch");
var index_1 = __importDefault(require("../../../lib/index"));
var Scene_1 = __importDefault(require("../3D/Scene"));
var WordLabDemo = (function () {
    function WordLabDemo(URL, CONTAINER, PARAMS) {
        this.params = {
            searchInput: null,
            apiInput: null,
            indexesLabels: true,
            wordsLabels: false,
            resultscount: 10
        };
        this._isLoading = false;
        this._dataset = [];
        if (PARAMS)
            this.params = PARAMS;
        (CONTAINER) ? this.container = CONTAINER : this.container = window.document.getElementsByTagName('body')[0];
        this.build(URL);
    }
    Object.defineProperty(WordLabDemo.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            this._isLoading = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordLabDemo.prototype, "fetchError", {
        get: function () {
            return this._fetchError;
        },
        set: function (value) {
            this._fetchError = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordLabDemo.prototype, "dataset", {
        get: function () {
            return this._dataset;
        },
        set: function (value) {
            this._dataset = value;
        },
        enumerable: false,
        configurable: true
    });
    WordLabDemo.prototype.build = function (URL) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        _c = (_b = this.dataset).concat;
                        return [4, this.fetchDataset(URL)];
                    case 1:
                        _a.dataset = _c.apply(_b, [_d.sent()]);
                        this.createLab();
                        return [2];
                }
            });
        });
    };
    WordLabDemo.prototype.createLab = function () {
        var _this = this;
        this.Lab = new index_1.default("", this.dataset, false, { from: 0, to: 10, paging: "page", params: {}, headers: {} }, function (name, data) {
            if (name === "ready") {
                setTimeout(function () { this.createInterface(); }.bind(_this), 500);
            }
        }, "id", [
            { type: "string", key: "label", nest: null },
            { type: "string", key: "short_description", nest: null },
            { type: "array", key: "tags", nest: null }
        ], [
            { key: "category", type: "string", nest: null },
            { key: "publication", type: "date", nest: null },
        ], [], 1, false, 1, true);
    };
    WordLabDemo.prototype.fetchDataset = function (request) {
        return __awaiter(this, void 0, void 0, function () {
            var response, body, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.isLoading = true;
                        return [4, fetch(request)];
                    case 1:
                        response = _a.sent();
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4, response.json()];
                    case 3:
                        body = _a.sent();
                        this.isLoading = false;
                        return [2, body.data];
                    case 4:
                        err_1 = _a.sent();
                        this.fetchError = err_1;
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    WordLabDemo.prototype.createInterface = function () {
        if (this.params.searchInput)
            this.params.searchInput.addEventListener("blur", this.search.bind(this));
        if (this.params.apiInput)
            this.params.apiInput.addEventListener("blur", this.reload.bind(this));
        this.display3D();
    };
    WordLabDemo.prototype.search = function () {
        var results = this.Lab.search(this.params.searchInput.value);
    };
    WordLabDemo.prototype.similar = function (id) {
        var results = this.Lab.similar(id);
    };
    WordLabDemo.prototype.reload = function () {
    };
    WordLabDemo.prototype.display3D = function () {
        this.scene = new Scene_1.default(this.container, null, null, null, null, true, true);
        for (var _i = 0, _a = this.Lab.indexes; _i < _a.length; _i++) {
            var index = _a[_i];
            this.scene.addIndex(index.pos, index.label);
        }
        for (var _b = 0, _c = this.Lab.words; _b < _c.length; _b++) {
            var index = _c[_b];
            this.scene.addWord(index.pos, index.token);
        }
        for (var _d = 0, _e = this.Lab.dataset; _d < _e.length; _d++) {
            var index = _e[_d];
            this.scene.addEntry(index.pos, index.id);
        }
    };
    return WordLabDemo;
}());
module.exports = WordLabDemo;
//# sourceMappingURL=WordLabDemo.js.map