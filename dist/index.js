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
var Tokenizer_1 = __importDefault(require("./Words/Tokenizer"));
var Middle_1 = require("./Maths/Middle");
var WordLab = (function () {
    function WordLab(URI, PAGING, WATCHER, UID, WORDSINDEX, INDEXES, SUBINDEXES, SCALE, DEBUG, MODE) {
        var _this = this;
        this._fetchError = null;
        this._isLoading = false;
        this.paging = false;
        this.debug = false;
        this._dataset = [];
        this._words = [];
        this.indexes = [];
        this.subIndexes = [];
        this.scale = 1000;
        this.mode = 0;
        this.wordsReducer = function () {
            var words = '';
            for (var _i = 0, _a = _this._dataset; _i < _a.length; _i++) {
                var set = _a[_i];
                var innerWords = '';
                for (var _b = 0, _c = _this.wordsIndex; _b < _c.length; _b++) {
                    var request = _c[_b];
                    switch (request.type) {
                        case 'string':
                            words = words + " " + set[request.key];
                            innerWords = words + " " + set[request.key];
                            break;
                        case 'array':
                            for (var _d = 0, _e = set[request.key]; _d < _e.length; _d++) {
                                var word = _e[_d];
                                words = words + " " + word;
                                innerWords = words + " " + set[request.key];
                            }
                            break;
                        default:
                            break;
                    }
                }
                set.WLwords = Tokenizer_1.default(innerWords)
                    .split('-')
                    .filter(function (value, index, self) { return self.indexOf(value) === index && value.length > 2; });
            }
            var test = Tokenizer_1.default(words);
            var all = test
                .split('-')
                .filter(function (value, index, self) { return self.indexOf(value) === index && value.length > 2; });
            for (var _f = 0, all_1 = all; _f < all_1.length; _f++) {
                var word = all_1[_f];
                _this.words.push({
                    token: word,
                    pos: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
                    weight: 0,
                });
            }
            return [];
        };
        this._watcher = WATCHER;
        this.uid = UID;
        if (MODE)
            this.mode = MODE;
        if (SCALE)
            this.scale = SCALE;
        if (DEBUG)
            this.debug = DEBUG;
        if (PAGING)
            this.paging = PAGING;
        this.wordsIndex = WORDSINDEX;
        this.requestIndex = INDEXES;
        this.build(URI, INDEXES, SUBINDEXES);
    }
    Object.defineProperty(WordLab.prototype, "fetchError", {
        get: function () {
            return this._fetchError;
        },
        set: function (value) {
            this._fetchError = value;
            this._watcher('fetchError', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordLab.prototype, "isLoading", {
        get: function () {
            return this._isLoading;
        },
        set: function (value) {
            this._isLoading = value;
            this._watcher('isLoading', value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordLab.prototype, "dataset", {
        get: function () {
            return this._dataset;
        },
        set: function (value) {
            this._dataset = value;
            this._watcher('dataset', this.debug ? value : null);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WordLab.prototype, "words", {
        get: function () {
            return this._words;
        },
        set: function (value) {
            this._words = value;
            this._watcher('words', this.debug ? value : null);
        },
        enumerable: false,
        configurable: true
    });
    WordLab.prototype.build = function (URL, INDEXES, SUBINDEXES) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _a = this;
                        _c = (_b = this.dataset).concat;
                        return [4, this.fetchDataset(URL)];
                    case 1:
                        _a.dataset = _c.apply(_b, [_d.sent()]).filter(function (value, index, self) {
                            return self.findIndex(function (item) { return item.id === value.id; }) === index;
                        });
                        return [4, this.setupIndexes(INDEXES)];
                    case 2:
                        _d.sent();
                        this.wordsReducer();
                        this.wordsDispatcher();
                        return [2];
                }
            });
        });
    };
    WordLab.prototype.setupIndexes = function (indexes) {
        var iterator = 0;
        var indexAxis = ['X', 'Y', 'Z', 'RX', 'RY', 'RZ'];
        var _loop_1 = function (index) {
            switch (index.type) {
                case 'string':
                    var indexSorted = this_1._dataset
                        .map(function (data) { return data[index.key]; })
                        .filter(function (value, index, self) {
                        return self.indexOf(value) === index && value !== '';
                    })
                        .sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                    this_1.dispatchIndexes(indexSorted, indexAxis[iterator]);
                    break;
                case 'array':
                    var values = [];
                    for (var _i = 0, _a = this_1._dataset; _i < _a.length; _i++) {
                        var set = _a[_i];
                        values = values.concat(set[index.key]);
                    }
                    values = values
                        .map(function (s) { return s.replace(/ /g, '').toLowerCase(); })
                        .filter(function (value, index, self) { return self.indexOf(value) === index && value !== ''; })
                        .filter(function (value, index, self) { return self.indexOf(value) === index && value !== ''; });
                    this_1.dispatchIndexes(values, indexAxis[iterator]);
                    break;
                case 'object':
                    var nests = [];
                    if (index.nest) {
                        switch (index.nest.type) {
                            case 'string':
                                for (var _b = 0, _c = this_1._dataset; _b < _c.length; _b++) {
                                    var set = _c[_b];
                                    nests = nests.concat(set[index.key][index.nest.key]);
                                }
                                nests = nests
                                    .map(function (s) { return s.replace(/ /g, '').toLowerCase(); })
                                    .filter(function (value, index, self) { return self.indexOf(value) === index && value !== ''; });
                                this_1.dispatchIndexes(nests, indexAxis[iterator]);
                                break;
                        }
                    }
                    break;
                default:
                    var indexsSorted = this_1._dataset
                        .map(function (data) { return data[index.key].toString(); })
                        .filter(function (value, index, self) {
                        return self.indexOf(value) === index && value !== '';
                    })
                        .sort(function (a, b) {
                        if (a < b) {
                            return -1;
                        }
                        if (a > b) {
                            return 1;
                        }
                        return 0;
                    });
                    this_1.dispatchIndexes(indexsSorted, indexAxis[iterator]);
                    break;
            }
            iterator++;
        };
        var this_1 = this;
        for (var _i = 0, indexes_1 = indexes; _i < indexes_1.length; _i++) {
            var index = indexes_1[_i];
            _loop_1(index);
        }
    };
    WordLab.prototype.dispatchIndexes = function (indexes, AXIS) {
        var angle = 0;
        var step = (2 * Math.PI) / indexes.length;
        for (var _i = 0, indexes_2 = indexes; _i < indexes_2.length; _i++) {
            var label = indexes_2[_i];
            var posX = void 0;
            var posY = void 0;
            var posZ = void 0;
            switch (AXIS) {
                case 'X':
                    posX = this.scale * Math.cos(angle);
                    posY = this.scale * Math.sin(angle);
                    (posZ = 0), Math.sin(angle);
                    break;
                case 'Y':
                    posX = this.scale * Math.cos(angle);
                    (posY = 0), Math.sin(angle);
                    posZ = this.scale * Math.sin(angle);
                    break;
                case 'Z':
                    (posX = 0), Math.sin(angle);
                    posY = this.scale * Math.sin(angle);
                    posZ = this.scale * Math.cos(angle);
                    break;
                default:
                    posX = this.scale * Math.cos(angle);
                    posY = this.scale * Math.sin(angle);
                    posZ = Math.sin(angle);
                    break;
            }
            this.indexes.push({
                label: label.toString(),
                pos: { x: posX, y: posY, z: posZ, rx: 0, ry: 0, rz: 0 },
                axis: AXIS,
            });
            angle += step;
        }
    };
    WordLab.prototype.wordsDispatcher = function () {
        var _loop_2 = function (set) {
            var _loop_3 = function (word) {
                var points = [];
                var WORD = this_2.words.find(function (w) { return w.token === word; });
                var _loop_4 = function (index) {
                    switch (index.type) {
                        case 'string':
                            var indexMove = this_2.indexes.find(function (i) { return i.label === set[index.key]; });
                            if (indexMove)
                                points.push(indexMove.pos);
                            break;
                        case 'array':
                            if (Array.isArray(set[index.key])) {
                                var _loop_5 = function (entry) {
                                    var indexKey = this_2.indexes.find(function (i) { return i.label === entry; });
                                    if (indexKey)
                                        points.push(indexKey.pos);
                                };
                                for (var _i = 0, _a = set[index.key]; _i < _a.length; _i++) {
                                    var entry = _a[_i];
                                    _loop_5(entry);
                                }
                            }
                            break;
                        case 'object':
                            if (index.nest && index.nest.key && set[index.key] && set[index.key][index.nest.key]) {
                                var objectKey = this_2.indexes.find(function (i) {
                                    return index.nest ? i.label === set[index.key][index.nest.key] : false;
                                });
                                if (objectKey)
                                    points.push(objectKey.pos);
                            }
                            break;
                    }
                };
                for (var _i = 0, _a = this_2.requestIndex; _i < _a.length; _i++) {
                    var index = _a[_i];
                    _loop_4(index);
                }
                if (WORD)
                    WORD.pos = Middle_1.Middle(points);
            };
            for (var _i = 0, _a = set.WLwords; _i < _a.length; _i++) {
                var word = _a[_i];
                _loop_3(word);
            }
        };
        var this_2 = this;
        for (var _i = 0, _a = this._dataset; _i < _a.length; _i++) {
            var set = _a[_i];
            _loop_2(set);
        }
    };
    WordLab.prototype.cleanUntil = function () {
    };
    WordLab.prototype.fetchDataset = function (request) {
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
    return WordLab;
}());
module.exports = WordLab;
