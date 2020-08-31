export default (a) => {
    let phonetik = {
        a: ["à", "á", "â", "ã", "ä", "å", "ae", "æ", "h<a", "h<â", "h<u", "h<o"], // A
        x: ["x>o", "x>i", "x>a", "x>e", "cc>a", "cc>e", "cc>i", "cc>o", "cc>u", "cc>y"], // KS
        ɔ̃: ["ion!>n", "ion!>e", "yon!>e", "yon!>n"],
        o: [">>aux", ">>eaux", "eau", "au", "ô", "ò", "ö", "ô", "õ"], // O
        Y: ["t!<ill", "r!<ill", "o<ill", "e<ill", "ai<ll", "ai<l", "a<y", "y>e", "y>a", "ill>a", "ill>e", "ill>o"], // Y
        W: ["kw", "quw", "qw"], // W
        G: ["gu"],
        k: [">>que", "qu", "ch>r", "ch>o", "ch>ia", "ck", "x>i", "c>t", "cc>a"], // K 
        ɲ: ["gn>e", "gn>a", "gn>o"], // GN
        ʀ: ["é<r", "è<r", "ë<r", "ê<r", "rr", "aire", ">>ert"], // R
        ɛ̃: ["ai!>ne", "ai>me", "i<en", "h<é", "h<è", "h<ê", "er>n", "er>r", "er>a", "er>e", "er>é", "er>i", "er>o", "er>u"], // É
        S: ["ss", "ç", "sc>e"], // S
        ɛ: ["t>e", ">>ez", ">>ais", ">>ait", "e>f", ">>er", "ai>n", "ai!>e", "ai!>o", "ai>r", ">>aient", ">>ées", ">>ée", "é", "è", "ë", "ê"], // É
        t: ['th'], // T
        º: ["ou"], // OU
        J: ["i<lle"], // Jx@
        ɔ̃: ["on!>n"], // ON
        ʃ: ["ch", "sch", "sh"], // CH
        ɐ: ["ng"], // ng
        1: ["ain", "ein", "un>[CONS]", "in>[CONS]", "im>[CONS]"],
        ʒ: ["dj", "j>ean"], // DJ
        ʒ: ["gi", "gy", "a<ge", "e<ge", "i<ge", "o<ge", "u<ge", "n<ge"], // J
        L: ["ai!<ll", "ei!<ll", "ui!<ll", "oi!<ll", "e<l", "é<l", "ë<l", "ê<l"], // L
        i: ["y!<a", "y!<a", "y!<o", "y!<u", "î", "ï", "ì"], // i
        v: ["w>a"], // v
        A: ['aon', '>>ant', "an!>c", "an!>t", "an!>n", "an!>a", "an!>e", "an!>i", "an!>o", "an!>u", "en!>e", "em>m", "an"], // AN
        f: ["ph>a", "ph>i", "ph>o", "ph>e", "ph>u", "ph>y"], // f
        Ω: ["om>m", "om>p", "om>pt", "om>e", "om>o", "om>i", "om>a", "om>u", "om>y"],
        E: ["oe", "œ", "oeu", "œu", "eu", "e!>i", "ie!>l", ">>eux", ">>ent"], // E
        m: ["mm"],
        z: ["s>i", "s>o"],
        δ: ["tion"],
        β: ["bou", "bout", "bhou", "bouh"],
        p: ["pp"],
        u: ['ü', "û", "ù"],
        ñ: ["gn"]
    }
    Object.keys(phonetik).forEach(key => {
        let w = a;
        for (let s in phonetik[key]) {
            let song = phonetik[key][s],
                replaced = false;
            // les negation avant
            if (song.indexOf("!<") !== -1) {
                // n'est pas précédé par
                let split = song.split('!<');
                if (w.slice(w.indexOf([split[1]]) - split[0].length, split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], "g"), key);
                replaced = true;
            }
            if (song.indexOf("!>") !== -1 && replaced === false) {
                // n'est pas suivi de
                let split = song.split('!>');
                if (w.slice(w.indexOf([split[0]]) - split[1].length, split[1].length) === split[1])
                    w = w.replace(new RegExp(split[0], "g"), key);
                replaced = true;
            }
            // ensuite tout ce qui commence par
            if (song.indexOf(">>") !== -1 && replaced === false) {
                // se termine par
                let split = song.split('>>');
                if (w.slice(w.indexOf([split[1]]), w.length) === split[1]) {
                    w = w.slice(0, w.indexOf([split[1]])) + key;
                    // new RegExp(split[0], "g"), key);
                }
                replaced = true;
            }
            if (song.indexOf("<<") !== -1 && replaced === false) {
                // est précédé de
                let split = song.split("<<");
                if (w.slice(w.indexOf([split[0]]), split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], "g"), key);
                replaced = true;
            }
            // puis les exceptions
            if (song.indexOf("<") !== -1 && replaced === false) {
                // est précédé de
                let split = song.split('<');
                if (w.slice(w.indexOf([split[1]]) - split[1].length, split[0].length) === split[0])
                    w = w.replace(new RegExp(split[1], "g"), key);
                replaced = true;
            }
            if (song.indexOf(">") !== -1 && replaced === false) {
                // est suivi de
                let split = song.split('>');
                let nextLetter = w.slice(w.indexOf([split[0]]) + split[0].length, split[1].length);
                if (nextLetter === split[1]) {
                    w = w.replace(new RegExp(split[0], "g"), key);
                }
                replaced = true;
            }
            // si rien n'a changé on remplace par default
            if (replaced === false && w.indexOf(song) !== -1) {
                w = w.replace(new RegExp(song, "g"), key);
            }
            a = w;
        }
    });
    return a;
}