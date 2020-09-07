/**
 * A Basic WordLab Articles Blog demo
 */

const WordLab = require('../lib/index');
console.log('WordLab ', WordLab);
const lab = new WordLab(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles',
    false,
    (name, data) => { console.log('watch ', name, data) },
    "id",
    [
        // list of words to parse and dispatch
        { type: "string", key: "label" },
        { type: "string", key: "short_description" },
        { type: "array", key: "tags" }
    ],
    [
        // define indexed keys props : x, y, z, rx, ry, rz
        { key: "category", type: "string" },
        { key: "publication", type: "date" },
        { key: "tags", type: "array" },
        { key: "author", type: "object", nest: { key: "id", type: "string" } }
        // !important at this time only string and only one level
        // you can add only 2 more indexed level... its suck...
    ],
    [],
    10000,
    false,
    1,
    true  // reduce dataset preserve only UID and geenerated Axis
)

