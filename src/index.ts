import WordLab from "./WordLab";
import WLworker from "./Worker/WLworker";
// types
import Watcher from './types/Watcher';
import IndexEntry from './types/IndexEntry';
import { DispatchMode } from './types/DispatchMode';
import ApiSetup from './types/ApiSetup';

class Wordlab {
    public DB: WordLab | undefined;
    constructor(
        URI: string,
        DATASET: any,
        PAGING: boolean,
        APISETUP: ApiSetup | null,
        WATCHER: Watcher,
        UID: string | number,
        WORDSINDEX: IndexEntry[],
        INDEXES: IndexEntry[],
        SUBINDEXES: string[],
        SCALE: number | null,
        DEBUG: boolean | null,
        MODE: DispatchMode,
        CLEAN: boolean,
        SIMPLIFY: boolean = false,
        WORKER: boolean = false,
    ) {
        // this.DB = new WLworker(URI, DATASET, PAGING, APISETUP, WATCHER, UID, WORDSINDEX, INDEXES, SUBINDEXES, SCALE, DEBUG, MODE, CLEAN, SIMPLIFY)
        if (WORKER)
            // tslint:disable-next-line: no-console
            console.log('has worker enabled')
        else
            this.DB = new WordLab(URI, DATASET, PAGING, APISETUP, WATCHER, UID, WORDSINDEX, INDEXES, SUBINDEXES, SCALE, DEBUG, MODE, CLEAN, SIMPLIFY)
    }
}
export = Wordlab;