// types
import Watcher from '../types/Watcher';
import IndexEntry from '../types/IndexEntry';
import { DispatchMode } from '../types/DispatchMode';
import ApiSetup from '../types/ApiSetup';

class WLworker {
    public worker: Worker | undefined;
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
        // tslint:disable-next-line: no-console
        console.log('register web worker');
    }
    create() {
        if (this.hasWorker())
            this.worker = new Worker('./wordlabWorker.js');
    }
    private hasWorker = () => {
        if (window && window.Worker)
            return true;
        return false;
    }
}
export = WLworker