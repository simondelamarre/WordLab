/**
 * Tokenizer return array of phonetik words from paragraph string
 * in pure js beta wordlab consider its like wordlab function
 * todo : checking out the aspects of "ement" => "reciproquement" on WordType parser to simplify statements
 */

import WordType = require("./WordTypes_FR");
// tslint:disable-next-line: no-var-requires
const unverbalizer = require("./Unverbalizer"); // checkouts verbs group return infititif
// tslint:disable-next-line: no-var-requires
const syllab = require("./Syllab"); // use required for any  exporte default js files

export default (paragraph: string) => {
    const REGLES = new WordType();
    // tslint:disable-next-line: no-unused-expression
    const cleaned = REGLES.cleanStr(paragraph).split(' ');
    const output = [];
    for (const word of cleaned) {
        output.push(
            syllab( // get syllab
                unverbalizer(  // remove verb conjugation
                    word.toLowerCase() // from cleaned words array
                )
            )
        );
    }
    return output.join('-');
}