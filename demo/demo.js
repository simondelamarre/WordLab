const WordLab = require('../lib/index');
const lab = new WordLab(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles',
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
    1000,
    false,
    "circular"
)
// console.log('wordlab => ', lab);
