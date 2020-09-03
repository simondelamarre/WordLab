const WordLab = require('../lib/index');
const lab = new WordLab(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles',
    (name, data) => { console.log('watch ', name, data.length) },
    "id",
    ["category"],
    [],
    1000,
    true
)
// lab.fetchDataset('https://us-central1-bige-start.cloudfunctions.net/api/articles');
console.log('wordlab => ', lab);
