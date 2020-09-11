const WordLab = require('../../WordLab.ts')

function create(URI, DATASET, PAGING, APISETUP, WATCHER, UID, WORDSINDEX, INDEXES, SUBINDEXES, SCALE, DEBUG, MODE, CLEAN, SIMPLIFY) {
    return new WordLab(URI, DATASET, PAGING, APISETUP, WATCHER, UID, WORDSINDEX, INDEXES, SUBINDEXES, SCALE, DEBUG, MODE, CLEAN, SIMPLIFY)
}

function reponse(event) {
    if (event.data == "Bonjour") {
        postMessage("Bonjour, je suis un worker");
    } else {
        postMessage("Maintenant je sais que tu es " +
            event.data.substr(26) + " !");
    }
}

//ajout d'un listener
addEventListener("message", reponse, false);