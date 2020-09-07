"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (a) {
    var phonetik = {
        a: ['à', 'á', 'â', 'ã', 'ä', 'å', 'ae', 'æ', 'h<a', 'h<â', 'h<u', 'h<o', '>>as', '>>at'],
        x: ['x>o', 'x>i', 'x>a', 'x>e', 'cc>a', 'cc>e', 'cc>i', 'cc>o', 'cc>u', 'cc>y'],
        ɔ̃: ['ion!>n', 'ion!>e', 'yon!>e', 'yon!>n'],
        o: ['>>aux', '>>eaux', 'eau', 'au', 'ô', 'ò', 'ö', 'ô', 'õ', '>>ho', '>>hau'],
        Y: ['t!<ill', 'r!<ill', 'o<ill', 'e<ill', 'ai<ll', 'ai<l', 'a<y', 'y>e', 'y>a', 'ill>a', 'ill>e', 'ill>o'],
        W: ['kw', 'quw', 'qw'],
        G: ['gu'],
        Er: ['eurs', 'eur', 'œur', '>>er'],
        k: [
            'ck',
            '>>que',
            'qu',
            'sc>[CONS]',
            'c>[CONS]',
            'ch>[CONS]',
            'ch>ia',
            'ck',
            'x>i',
            'c>t',
            'cc>a',
            '[VOY]<ch',
            'ch>o',
        ],
        ɲ: ['gn>e', 'gn>a', 'gn>o'],
        ʀ: ['é<r', 'è<r', 'ë<r', 'ê<r', 'rr', 'aire', '>>ert', '>>erds', '>>erd', '>>ère', '>>air', 'aire'],
        C: [
            'ai!>ne',
            'ai>me',
            'i<en',
            'h<é',
            'h<è',
            'h<ê',
            'er>n',
            'er>r',
            'er>a',
            'er>e',
            'er>é',
            'er>i',
            'er>o',
            'er>u',
            '>>ay',
            '>>ers',
        ],
        S: ['ss', 'ç', 'sc>e'],
        ɛ: [
            't>e',
            '>>ez',
            '>>ais',
            '>>ait',
            'e>f',
            '>>er',
            'ai>n',
            'ai!>e',
            'ai!>o',
            'ai>r',
            '>>aient',
            '>>ées',
            '>>ée',
            'é',
            'è',
            'ë',
            'ê',
        ],
        T: ['ttt', 'tt', 'tth', 'th'],
        º: ['ou'],
        J: ['i<lle'],
        O: ['on!>n', 'on>e'],
        ʃ: ['ch>[VOY]', 'sch', 'sh'],
        e: ['eux', 'eu', 'œ'],
        ɐ: ['ng'],
        $: ['ain', 'ein', 'ain>[CONS]', 'un>[CONS]', 'in>[CONS]', 'im>[CONS]', 'hein', '>>hum', '>>um'],
        ʒ: ['dj', 'j>ean'],
        g: ['gi', 'gy', 'a<ge', 'e<ge', 'i<ge', 'o<ge', 'u<ge', 'n<ge', 'ji'],
        L: ['ai!<ll', 'ei!<ll', 'ui!<ll', 'oi!<ll', 'e<l', 'é<l', 'ë<l', 'ê<l'],
        i: ['y!<a', 'y!<a', 'y!<o', 'y!<u', 'î', 'ï', 'ì'],
        v: ['w>a'],
        A: ['aon', '>>ant', 'an!>c', 'an!>t', 'an!>n', 'an!>a', 'an!>e', 'an!>i', 'an!>o', 'an!>u', 'en!>e', 'em>m', 'an'],
        f: ['ph>a', 'ph>i', 'ph>o', 'ph>e', 'ph>u', 'ph>y'],
        Ω: ['om>m', 'om>p', 'om>pt', 'om>e', 'om>o', 'om>i', 'om>a', 'om>u', 'om>y'],
        E: ['oe', 'œ', 'oeu', 'œu', 'eu', 'e!>i', 'ie!>l', '>>eux', '>>ent'],
        m: ['mm'],
        z: ['s>i', 's>o'],
        δ: ['tion', '>>ssion', 'ssion>[CONS]'],
        β: ['bou', 'bout', 'bhou', 'bouh'],
        p: ['pp', 'p>[CONS]', 'p>[VOY]'],
        u: ['ü', 'û', 'ù'],
        ñ: ['gn'],
        AR: ['arre', 'art', 'are', 'arr'],
    };
    Object.keys(phonetik).forEach(function (key) {
        var w = a;
        for (var s in phonetik[key]) {
            var song = phonetik[key][s];
            var replaced = false;
            var split = [];
            if (song.indexOf('!<') !== -1) {
                split = song.split('!<');
                if (w.slice(w.indexOf(split[1]) - split[0].length, split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], 'g'), key);
                replaced = true;
            }
            if (song.indexOf('!>') !== -1 && replaced === false) {
                split = song.split('!>');
                if (w.slice(w.indexOf(split[0]) - split[1].length, split[1].length) === split[1])
                    w = w.replace(new RegExp(split[0], 'g'), key);
                replaced = true;
            }
            if (song.indexOf('>>') !== -1 && replaced === false) {
                split = song.split('>>');
                if (w.slice(w.indexOf(split[1]), w.length) === split[1])
                    w = w.slice(0, w.indexOf(split[1])) + key;
                replaced = true;
            }
            if (song.indexOf('<<') !== -1 && replaced === false) {
                split = song.split('<<');
                if (w.slice(w.indexOf(split[0]), split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], 'g'), key);
                replaced = true;
            }
            if (song.indexOf('<') !== -1 && replaced === false) {
                split = song.split('<');
                var prevLetter = w.slice(w.indexOf(split[0]) + split[0].length, split[1].length);
                if (w.slice(w.indexOf(split[1]) - split[1].length, split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], 'g'), key);
                replaced = true;
            }
            if (song.indexOf('>') !== -1 && replaced === false) {
                split = song.split('>');
                var nextLetter = w.slice(w.indexOf(split[0]) + split[0].length, split[1].length);
                if ((split[1] === '[CONS]' && isConsonne(nextLetter)) ||
                    (split[1] === '[VOY]' && isVoyelle(nextLetter)) ||
                    nextLetter.slice(0, split[1].length) === split[1]) {
                    w = w.replace(new RegExp(split[0], 'g'), key);
                }
                replaced = true;
            }
            if (replaced === false && w.indexOf(song) !== -1) {
                w = w.replace(new RegExp(song, 'g'), key);
            }
            a = w;
        }
    });
    return a;
});
var isConsonne = function (str) {
    return ['z', 'r', 't', 'p', 'q', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'].includes(str.slice(0, 1));
};
var isVoyelle = function (str) { return ['a', 'e', 'i', 'o', 'u', 'y'].includes(str.slice(0, 1)); };
