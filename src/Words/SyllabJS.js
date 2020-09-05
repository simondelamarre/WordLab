import WordType from "../Words/WordTypes_FR";
import phonetise from "../Words/Phonetise";

// TODO rewrite logik in typescript
export default (str) => {
    const REGLES = new WordType();
    var a = str.toLowerCase();
    // CHECK LES NOMS COMPOSES AVEC TRAIT D'function
    // phonetik reducer list
    if (REGLES.isHaspire(a))
        a.replaceFirst("h", "");

    if (REGLES.invariables.indexOf(a) && a.slice(a.length - 1, a.length) === "s")
        a = a.slice(0, a.length - 1);

    // TODO use coef in results
    let coefficient = REGLES.getCoefficient(a);

    a = phonetise(a);
    // a = a.toLowerCase();

    if (a.split("-").length > 0) {
        var w = a.split("-"),
            m = "";
        for (var i = 0; i < w.length; i++) {
            w[i].slice(-1) === "s"
                ? (w[i] = w[i].substring(0, w[i].length - 1))
                : // eslint-disable-next-line no-self-assign
                (w[i] = w[i]);
            m += w[i];
        }
        a = m;
    }
    a = a.split("");
    var f = a.shift(),
        r = "",
        codes = {
            // group 1
            a: 0,
            e: 0,
            i: 0,
            o: 0,
            u: 0,
            y: 0,
            // group 2
            b: 1,
            f: 1,
            p: 1,
            v: 1,
            // group 3
            c: 2,
            g: 2,
            J: 2,
            k: 2,
            q: 2,
            s: 2,
            x: 2,
            z: 2,
            // group 4
            d: 3,
            t: 3,
            h: 3,
            W: 3,
            w: 3,
            // group 5
            l: 4,
            // group 6
            m: 5,
            n: 5,
            // group 7
            r: 6,
            //  exeptions group
            ʒ: "A",
            ɛ̃: "B",
            ɛ: "C",
            ɔ̃: "D",
            ɲ: "E",
            ʀ: "F",
            º: "G",
            ɔ̃: "H",
            ʃ: "I",
            ɐ: "J",
            1: "K",
            ʒ: "L",
            v: "M",
            A: "N",
            Ω: "O",
            δ: "P",
            β: "Q",
            Y: "R",
            S: "S",
            E: "T",
            G: "U",
            ñ: "V"
        }

    r = f + a
        // eslint-disable-next-line no-unused-vars
        .map(function (v, i, a) {
            return codes[v];
        })
        .filter(function (v, i, a) {
            return i === 0 ? v !== codes[f] : v !== a[i - 1];
        })
        .join("");
    this._onPropertyChanged('syllab', `${s} <=> ${a}`);
    return r;
    // (r).toUpperCase();
}
