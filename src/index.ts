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
import IndexEntry from "./types/IndexEntry"
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
        WORDS: string[],
        INDEXES: IndexEntry[],
        SUBINDEXES: string[],
        SCALE: number | null,
        DEBUG: boolean | null,
        MODE: string | null
    ) {
        this._watcher = WATCHER;
        this.uid = UID;
        if (MODE)
            this.mode = MODE;
        if (SCALE)
            this.scale = SCALE;
        if (DEBUG)
            this.debug = DEBUG;
        this.build(URI, INDEXES, SUBINDEXES);
    }
    private async build(URL: string, INDEXES: IndexEntry[], SUBINDEXES: string[]) {
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
    private setupIndexes = async (indexes: IndexEntry[]) => {
        let listUniqIndex: string[][] = [];
        let iterator: number = 0;
        const indexAxis = ["X", "Y", "Z", "RX", "RY", "RZ"];
        for (const index of indexes) {
            switch (index.type) {
                case 'string':
                    const indexSorted: [] = listUniqIndex = this._dataset.map(
                        (data: { [x: string]: any }) => data[index.key])
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => {
                            return self.indexOf(value) === index && value !== "";
                        }).sort((a: string, b: string) => {
                            if (a < b) { return -1; }
                            if (a > b) { return 1; }
                            return 0;
                        }).map((w: string) => Tokenizer(w));
                    this.dispatchIndexes(indexSorted, indexAxis[iterator]);
                    listUniqIndex.push(indexSorted);
                    break;
                case 'array':
                    // Array of srting only
                    let values: string[] = [];
                    for (const set of this._dataset) {
                        values = values.concat(set[index.key]);
                    }
                    values = values
                        .map((s: string) => s.replace(/ /g, '').toLowerCase())
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== "")
                        .map((w: string) => Tokenizer(w))
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== "");
                    this.dispatchIndexes(values, indexAxis[iterator]);
                    listUniqIndex.push(values);
                    break;
                case 'object':
                    // todo deport parser from type to another function for nested objects
                    let nests: string[] = [];
                    if (index.nest) {
                        switch (index.nest.type) {
                            case 'string':
                                for (const set of this._dataset) {
                                    nests = nests.concat(set[index.key][index.nest.key]);
                                }
                                nests = nests
                                    .map((s: string) => s.replace(/ /g, '').toLowerCase())
                                    // tslint:disable-next-line: no-shadowed-variable
                                    .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== "");

                                this.dispatchIndexes(nests, indexAxis[iterator]);
                                listUniqIndex.push(nests);
                                break;
                        }
                    }
                    break;
                default:
                    // for any others types like sizes, dates, prices etc do not tokenize words
                    const indexsSorted: [] = listUniqIndex = this._dataset.map(
                        (data: { [x: string]: any }) => data[index.key])
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => {
                            return self.indexOf(value) === index && value !== "";
                        }).sort((a: string, b: string) => {
                            if (a < b) { return -1; }
                            if (a > b) { return 1; }
                            return 0;
                        });
                    this.dispatchIndexes(indexsSorted, indexAxis[iterator]);
                    listUniqIndex.push(indexsSorted);
                    break;
            }
            iterator++
            // todo return list string array
        }
        return listUniqIndex;
    }
    // todo dispatch on circle with axes
    private dispatchIndexes(indexes: string[], AXIS: string) {
        let angle = 0;
        const step = 2 * Math.PI / indexes.length;
        for (const label of indexes) {
            let posX: number;
            let posY: number;
            let posZ: number;
            switch (AXIS) {
                case "X":
                    posX = (this.scale * Math.cos(angle));
                    posY = (this.scale * Math.sin(angle));
                    posZ = 0, Math.sin(angle);
                    break;
                case "Y":
                    posX = (this.scale * Math.cos(angle));
                    posY = 0, Math.sin(angle);
                    posZ = (this.scale * Math.sin(angle));
                    break;
                case "Z":
                    posX = 0, Math.sin(angle);
                    posY = (this.scale * Math.sin(angle));
                    posZ = (this.scale * Math.cos(angle));
                    break;
                default:
                    posX = (this.scale * Math.cos(angle));
                    posY = (this.scale * Math.sin(angle));
                    posZ = Math.sin(angle);
                    break;
            }
            // let amplitude = (this.setup.options.scale * this.getCount(key, indexes.length));
            // let amplitude = 0; //(this.setup.options.scale * this.getCount(key));
            this.indexes.push({ label: label.toString(), pos: { x: posX, y: posY, z: posZ, rx: 0, ry: 0, rz: 0 }, axis: AXIS })
            angle += step;
        };
    }
}
export = WordLab
