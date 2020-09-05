const WordLab = require('../lib/index');
const lab = new WordLab(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles',
    (name, data) => { console.log('watch ', name, data.length) },
    "id",
    ["short_description"],
    [ // define indexed keys poos  x, y, z, rx, ry, rz
        { key: "category", type: "string" },
        { key: "publication", type: "date" },
        { key: "tags", type: "array" },
        { key: "author", type: "object", nest: { key: "id", type: "string" } }],
    [],
    1000,
    true
)
// lab.fetchDataset('https://us-central1-bige-start.cloudfunctions.net/api/articles');
console.log('wordlab => ', lab);
