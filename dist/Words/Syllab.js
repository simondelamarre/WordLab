"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WordType = require("./WordTypes_FR");
var Phonetise_1 = __importDefault(require("./Phonetise"));
exports.default = (function (str) {
    var REGLES = new WordType();
    var a = str.toLocaleLowerCase();
    if (REGLES.isHaspire(a)) {
        a = a.replace('h', '');
    }
    if (REGLES.isInvariable(a) && a.slice(a.length - 1, a.length) === 's')
        a = a.slice(0, a.length - 1);
    a = Phonetise_1.default(a);
    if (a.split('-').length > 0) {
        var w = a.split('-');
        var m = '';
        for (var i = 0; i < w.length; i++) {
            w[i].slice(-1) === 's'
                ? (w[i] = w[i].substring(0, w[i].length - 1))
                :
                    (w[i] = w[i]);
            m += w[i];
        }
        a = m;
    }
    var word = a.split('');
    var f = word.shift() || '';
    var codes = {
        a: 0,
        e: 7,
        i: 8,
        o: 9,
        u: 'u',
        y: 'y',
        b: 1,
        f: 1,
        p: 1,
        v: 1,
        c: 2,
        g: 2,
        j: 2,
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
        T: 'T',
        ʒ: 'A',
        C: 'B',
        ɛ: 'C',
        ɔ̃: 'D',
        ɲ: 'E',
        ʀ: 'F',
        º: 'G',
        H: 'H',
        ʃ: 'I',
        ɐ: 'J',
        U: 'K',
        L: 'L',
        M: 'M',
        A: 'N',
        Ω: 'O',
        δ: 'P',
        β: 'Q',
        Y: 'R',
        S: 'S',
        E: 'T',
        G: 'U',
        ñ: 'V',
        $: '$',
        AR: 'AR',
    };
    word = word.map(function (v) {
        return codes[v] ? codes[v].toString() : v;
    });
    return "" + f + word.join('');
});
