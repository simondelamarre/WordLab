import WordType = require('./WordTypes_FR');
import phonetise from './Phonetise';

interface CodesTypes {
    [key: string]: string | number;
}

export default (str: string) => {
    const REGLES = new WordType();
    let a: string = str.toLocaleLowerCase();
    if (REGLES.isHaspire(a)) {
        a = a.replace('h', '');
    }
    if (REGLES.isInvariable(a) && a.slice(a.length - 1, a.length) === 's') a = a.slice(0, a.length - 1);
    // todo use coef multiplicator of influence or remove it
    // const coefficient = REGLES.getCoefficient(a, "");
    a = phonetise(a);
    if (a.split('-').length > 0) {
        const w = a.split('-');
        let m = '';
        for (let i = 0; i < w.length; i++) {
            w[i].slice(-1) === 's'
                ? (w[i] = w[i].substring(0, w[i].length - 1))
                : // eslint-disable-next-line no-self-assign
                (w[i] = w[i]);
            m += w[i];
        }
        a = m;
    }
    let word = a.split('');
    const f = word.shift() || '';

    const codes: CodesTypes = {
        // group 1
        a: 0,
        e: 7,
        i: 8,
        o: 9,
        u: 'u',
        y: 'y',
        // group 2
        b: 1,
        f: 1,
        p: 1,
        v: 1,
        // group 3
        c: 2,
        g: 2,
        j: 2,
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
    word = word.map((v: string) => {
        return codes[v] ? codes[v].toString() : v;
    });
    // todo don't know filter utillity... check this out...
    /* .filter((v: string | number, i: number, u: []) => {
          return i === 0 ? v !== codes[f] : v !== u[i - 1];
      }) */
    return `${f}${word.join('')}`;
};
