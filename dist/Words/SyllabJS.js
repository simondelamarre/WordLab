"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var WordTypes_FR_1 = __importDefault(require("../Words/WordTypes_FR"));
var Phonetise_1 = __importDefault(require("../Words/Phonetise"));
exports.default = (function (str) {
    var REGLES = new WordTypes_FR_1.default();
    var a = str.toLowerCase();
    if (REGLES.isHaspire(a))
        a.replaceFirst('h', '');
    if (REGLES.invariables.indexOf(a) && a.slice(a.length - 1, a.length) === 's')
        a = a.slice(0, a.length - 1);
    var coefficient = REGLES.getCoefficient(a);
    a = Phonetise_1.default(a);
    if (a.split('-').length > 0) {
        var w = a.split('-'), m = '';
        for (var i = 0; i < w.length; i++) {
            w[i].slice(-1) === 's'
                ? (w[i] = w[i].substring(0, w[i].length - 1))
                :
                    (w[i] = w[i]);
            m += w[i];
        }
        a = m;
    }
    a = a.split('');
    var f = a.shift(), r = '', codes = {
        a: 0,
        e: 0,
        i: 0,
        o: 0,
        u: 0,
        y: 0,
        b: 1,
        f: 1,
        p: 1,
        v: 1,
        c: 2,
        g: 2,
        J: 2,
        k: 2,
        q: 2,
        s: 2,
        x: 2,
        z: 2,
        d: 3,
        t: 3,
        h: 3,
        W: 3,
        w: 3,
        l: 4,
        m: 5,
        n: 5,
        r: 6,
        ʒ: 'A',
        ɛ̃: 'B',
        ɛ: 'C',
        ɔ̃: 'D',
        ɲ: 'E',
        ʀ: 'F',
        º: 'G',
        ɔ̃: 'H',
        ʃ: 'I',
        ɐ: 'J',
        1: 'K',
        ʒ: 'L',
        v: 'M',
        A: 'N',
        Ω: 'O',
        δ: 'P',
        β: 'Q',
        Y: 'R',
        S: 'S',
        E: 'T',
        G: 'U',
        ñ: 'V',
    };
    r =
        f +
            a
                .map(function (v, i, a) {
                return codes[v];
            })
                .filter(function (v, i, a) {
                return i === 0 ? v !== codes[f] : v !== a[i - 1];
            })
                .join('');
    _this._onPropertyChanged('syllab', s + " <=> " + a);
    return r;
});
