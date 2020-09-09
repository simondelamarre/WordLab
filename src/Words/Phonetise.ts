/**
 * phonetise utility return reduced string from french words
 *
 * Sample result : Matthieu | mathieu | mathieu => return maTie
 *
 * this export is based on french langage only
 * Note that the order is important to priorise replace exceptions
 * dictionnary formulae about phonetik object writting params array list
 * @string : replace each string by one included in array
 * @string > @string : replace each string followed by string
 * @string < @string : replace each string prepended by string
 * >> @string : each word closed by string
 * << @string : each word begined by string
 * @string !> @string : string who's not followed by string
 * [CONS] : is consonant
 * [VOY] : is vowel
 * @string > [CONS] : string folllowed by consonant
 * @string > [VOY] : string folllowed by vowel
 * [VOY] < @string:  string prepended by vowel
 * [CONS] < @string:  string prepended by consonant
 */

interface PhonetikObject {
  [key: string]: string[];
}

export default (a: string) => {
  const phonetik: PhonetikObject = {
    a: ['à', 'á', 'â', 'ã', 'ä', 'å', 'ae', 'æ', 'h<a', 'h<â', 'h<u', 'h<o', '>>as', '>>at'], // A
    x: ['x>o', 'x>i', 'x>a', 'x>e', 'cc>a', 'cc>e', 'cc>i', 'cc>o', 'cc>u', 'cc>y'], // KS
    ɔ̃: ['ion!>n', 'ion!>e', 'yon!>e', 'yon!>n'],
    o: ['>>aux', '>>eaux', 'eau', 'au', 'ô', 'ò', 'ö', 'ô', 'õ', '>>ho', '>>hau'], // O
    Y: ['t!<ill', 'r!<ill', 'o<ill', 'e<ill', 'ai<ll', 'ai<l', 'a<y', 'y>e', 'y>a', 'ill>a', 'ill>e', 'ill>o'], // Y
    W: ['kw', 'quw', 'qw'], // W
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
      '>>c',
      '<<c',
      'c'
    ], // K
    ɲ: ['gn>e', 'gn>a', 'gn>o'], // GN
    ʀ: ['é<r', 'è<r', 'ë<r', 'ê<r', 'rr', 'aire', '>>ert', '>>erds', '>>erd', '>>ère', '>>air', 'aire'], // R
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
    ], // É
    S: ['ss', 'ç', 'sc>e'], // S
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
    ], // É
    T: ['ttt', 'tt', 'tth', 'th'], // T
    º: ['ou'], // OU
    J: ['i<lle'], // Jx@
    O: ['on!>n', 'on>e'], // ERROR duplicated ɔ̃: ["on!>n"], // ON | one
    ʃ: ['ch>[VOY]', 'sch', 'sh'], // CH
    e: ['eux', 'eu', 'œ'],
    ɐ: ['>>ng'], // ng
    $: ['ain', 'ein', 'ain>[CONS]', 'un>[CONS]', 'in>[CONS]', 'im>[CONS]', 'hein', '>>hum', '>>um'], // 1: number => cannot be json key replaced by $
    ʒ: ['dj', 'j>ean'], // DJ
    g: ['gi', 'gy', 'a<ge', 'e<ge', 'i<ge', 'o<ge', 'u<ge', 'n<ge', 'ji'], // J
    L: ['ai!<ll', 'ei!<ll', 'ui!<ll', 'oi!<ll', 'e<l', 'é<l', 'ë<l', 'ê<l'], // L
    i: ['y!<a', 'y!<a', 'y!<o', 'y!<u', 'î', 'ï', 'ì'], // i
    v: ['w>a'], // v || wagon sample V=W
    A: ['aon', '>>ant', 'an!>c', 'an!>t', 'an!>n', 'an!>a', 'an!>e', 'an!>i', 'an!>o', 'an!>u', 'en!>e', 'em>m', 'an'], // AN
    f: ['ph>a', 'ph>i', 'ph>o', 'ph>e', 'ph>u', 'ph>y'], // f
    Ω: ['om>m', 'om>p', 'om>pt', 'om>e', 'om>o', 'om>i', 'om>a', 'om>u', 'om>y'],
    E: ['oe', 'œ', 'oeu', 'œu', 'eu', 'e!>i', 'ie!>l', '>>eux', '>>ent'], // E
    m: ['mm'],
    n: ['nn'],
    z: ['s>i', 's>o'],
    δ: ['tion', '>>ssion', 'ssion>[CONS]'],
    β: ['bou', 'bout', 'bhou', 'bouh'],
    p: ['pp', 'p>[CONS]', 'p>[VOY]'],
    u: ['ü', 'û', 'ù'],
    ñ: ['gn'],
    AR: ['arre', 'art', 'are', 'arr'],
  };
  Object.keys(phonetik).forEach((key: string) => {
    let w = a;
    // tslint:disable-next-line: forin
    for (const s in phonetik[key]) {
      const song = phonetik[key][s];
      let replaced = false;
      let split: string[] = [];
      // les negation avant
      if (song.indexOf('!<') !== -1) {
        // n'est pas précédé par
        split = song.split('!<');
        if (w.slice(w.indexOf(split[1]) - split[0].length, split[0].length) === split[0])
          w = w.replace(new RegExp(split[1], 'g'), key);
        replaced = true;
      }
      if (song.indexOf('!>') !== -1 && replaced === false) {
        // n'est pas suivi de
        split = song.split('!>');
        if (w.slice(w.indexOf(split[0]) - split[1].length, split[1].length) === split[1])
          w = w.replace(new RegExp(split[0], 'g'), key);
        replaced = true;
      }
      // ensuite tout ce qui commence par
      if (song.indexOf('>>') !== -1 && replaced === false) {
        // se termine par
        split = song.split('>>');
        if (w.slice(w.indexOf(split[1]), w.length) === split[1]) w = w.slice(0, w.indexOf(split[1])) + key;
        // new RegExp(split[0], "g"), key);

        replaced = true;
      }
      if (song.indexOf('<<') !== -1 && replaced === false) {
        // est précédé de
        split = song.split('<<');
        if (w.slice(w.indexOf(split[0]), split[0].length) === split[0]) w = w.replace(new RegExp(split[1], 'g'), key);
        replaced = true;
      }
      // puis les exceptions
      if (song.indexOf('<') !== -1 && replaced === false) {
        // todo check splitted 1 < [CONS] && [VOY]
        // est précédé de
        split = song.split('<');
        const prevLetter = w.slice(w.indexOf(split[0]) + split[0].length, split[1].length);
        if (w.slice(w.indexOf(split[1]) - split[1].length, split[0].length) === split[0])
          w = w.replace(new RegExp(split[1], 'g'), key);
        replaced = true;
      }
      if (song.indexOf('>') !== -1 && replaced === false) {
        // todo check splitted 1 > [CONS] && [VOY]
        // est suivi de
        split = song.split('>');
        const nextLetter = w.slice(w.indexOf(split[0]) + split[0].length, split[1].length);

        if (
          (split[1] === '[CONS]' && isConsonne(nextLetter)) ||
          (split[1] === '[VOY]' && isVoyelle(nextLetter)) ||
          nextLetter.slice(0, split[1].length) === split[1]
        ) {
          w = w.replace(new RegExp(split[0], 'g'), key);
        }
        replaced = true;
      }
      // si rien n'a changé on remplace par default
      if (replaced === false && w.indexOf(song) !== -1) {
        w = w.replace(new RegExp(song, 'g'), key);
      }
      a = w;
    }
  });
  return a;
};
const isConsonne = (str: string) =>
  ['z', 'r', 't', 'p', 'q', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'w', 'x', 'c', 'v', 'b', 'n'].includes(
    str.slice(0, 1),
  );
const isVoyelle = (str: string) => ['a', 'e', 'i', 'o', 'u', 'y'].includes(str.slice(0, 1));
