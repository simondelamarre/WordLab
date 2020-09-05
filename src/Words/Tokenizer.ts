/**
 * Tokenizer return array of phonetik words from paragraph string
 * in pure js beta wordlab consider its like wordlab function
 * todo : checking out the aspects of "ement" => "reciproquement" on WordType parser to simplify statements
 */

import WordType = require("../Words/WordTypes_FR");
// tslint:disable-next-line: no-var-requires
// const unverbalizer = require("../Words/Unverbalizer"); // checkouts verbs group return infititif
// tslint:disable-next-line: no-var-requires
// const syllab = require("../Words/Syllab"); // use required for any  exporte default js files
import Syllab from "../Words/Syllab"
import Unverbalizer from "../Words/Unverbalizer"

export default (paragraph: string) => {
    const REGLES = new WordType();
    // tslint:disable-next-line: no-unused-expression
    const cleaned = REGLES.cleanStr(paragraph).split(' ');
    const output = [];
    for (let word of cleaned) {
        word = Unverbalizer(word);
        output.push(
            Syllab( // get syllab
                word.toLowerCase() // from cleaned words array
            )
        );
    }
    return output.join('-');
}