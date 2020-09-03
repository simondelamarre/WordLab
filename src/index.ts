/**
 * TODO : need a xl dataset from ecommerce website
 * TODO : actually weneed an id on the workflow... need to make id such as var like uid ?= { [x: string]: any }...
 * Wordlab reduce large text dataset
 * define multiple indexes
 * allow you to search better and faster
 * @param URI : string => API call to load default dataset
 * @param watcher : void => callback function on each vars
 * @param debug : boolean => return dataset while setter is called in whatcher
 * @param UID : string => uniq identifier to merge updated dataset multi pages common errors from your API
 * @param mode : String => circus by default dispatch indexes in 3D space values : circus | linear | unbielivable
 */
import "isomorphic-fetch"
// types
import Watcher from "./types/Watcher"
import WordlabIndex from "./types/WordlabIndex"
import Word from "./types/Word"
import Axis from "./types/Axis"
// classes
import Tokenizer from "./Words/Tokenizer"
import IndexOrientation from "./types/IndexOrientation"

class WordLab {
    public _watcher: Watcher;

    private debug: boolean = false;
    private uid: string;
    private _dataset: any = [];
    get dataset(): any { return this._dataset; };
    set dataset(value: any) { this._dataset = value; this._watcher("dataset", (this.debug) ? value : null); }

    private _words: Word[] = [];
    get words(): Word[] { return this._words; }
    set words(value: Word[]) { this._words = value; this._watcher("words", (this.debug) ? value : null); }

    private mode: string = "circus"; // mode is the way to dispatch indexed vectors3D in space | circus: default | linear | unbelievable
    private indexes: WordlabIndex[] = [];
    private subIndexes: WordlabIndex[] = [];
    private scale: number = 1000;

    constructor(
        URI: string,
        WATCHER: Watcher,
        UID: string,
        INDEXES: string[],
        SUBINDEXES: string[],
        SCALE: number | null,
        DEBUG: boolean | null,
        MODE: string | null
    ) {
        this._watcher = WATCHER;
        this.uid = UID;
        if (MODE)
            this.mode = MODE
        if (SCALE)
            this.scale = SCALE;
        if (DEBUG)
            this.debug = DEBUG;
        this.build(URI, INDEXES, SUBINDEXES);
    }
    private async build(URL: string, INDEXES: string[], SUBINDEXES: string[]) {
        this.dataset = this.dataset
            .concat(await this.fetchDataset(URL))
            .filter((value: any, index: number, self: any) => {
                return self.findIndex((item: { id: any }) => item.id === value.id) === index;
            });
        await this.setupIndexes(INDEXES);
    }
    private async fetchDataset(
        request: RequestInfo
    ): Promise<any> {
        const response = await fetch(request);
        const body = await response.json();
        return body.data;
    }
    private async setupIndexes(indexes: string[]) {
        for (const index of indexes) {
            // tslint:disable-next-line: no-shadowed-variable
            const listUniqIndex = this._dataset.map((data: { [x: string]: any }) => data[index]).filter((value: any, index: number, self: any) => {
                return self.indexOf(value) === index && value !== "";
            })
            // tslint:disable-next-line: no-console
            console.log(listUniqIndex)
            // todo return list string array
        }
    }
    // todo dispatch on circle with axes
    private dispatchIndexes(indexes: string[]) {
        // todo type of ouput is an axis
        let output = [];
        const ln = indexes.length;
        let angle = 0;
        const step = 2 * Math.PI / ln;
        for (const indeex of indexes) {
            const posX = (this.scale * Math.cos(angle));
            const posY = (this.scale * Math.sin(angle));
            // let posZ = Math.sin(angle);
            // let amplitude = (this.setup.options.scale * this.getCount(key, indexes.length));
            // let amplitude = 0; //(this.setup.options.scale * this.getCount(key));
            // this.output[this.setup.options.index][key].push([posX, posY, amplitude]);
            angle += step;
            // todo output.push(X,Y,Z)
        });
        return output;
    }
}
export = WordLab
