/**
 * Tokenizer return array of phonetik words from paragraph string
 * in pure js beta wordlab consider its like wordlab function
 */

import WordType = require("./WordTypes_FR");
// tslint:disable-next-line: no-var-requires
const syllab = require("./Syllab"); // use required for any  exporte default js files

export default (paragraph: string) => {
    const REGLES = new WordType();
    // tslint:disable-next-line: no-unused-expression
    const cleaned = REGLES.cleanStr(paragraph).split(' ');
    const output = [];
    for (const word of cleaned) {
        output.push(syllab(word.toLowerCase()));
    }
    return syllab(output.join('-'));
}