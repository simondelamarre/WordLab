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

import 'isomorphic-fetch'; // needed to fetch api from URI setup

// types
import Watcher from './types/Watcher';
import WordlabIndex from './types/WordlabIndex';
import Word from './types/Word';
import IndexEntry from './types/IndexEntry';
import { DispatchMode } from './types/DispatchMode';
import Vector3D from './types/Vector3D';

// classes
import Tokenizer from './Words/Tokenizer';
import IndexOrientation from './types/IndexOrientation';
import Axis from './types/Axis';
import { Middle } from './Maths/Middle';

class WordLab {
    public _watcher: Watcher;

    public _fetchError: any = null;
    get fetchError(): any {
        return this._fetchError;
    }
    set fetchError(value: any) {
        this._fetchError = value;
        this._watcher('fetchError', value);
    }

    public _isLoading: boolean = false;
    get isLoading(): any {
        return this._isLoading;
    }
    set isLoading(value: any) {
        this._isLoading = value;
        this._watcher('isLoading', value);
    }

    private paging: boolean = false;
    private debug: boolean = false;
    private uid: string | number;

    private _dataset: any = [];
    get dataset(): any {
        return this._dataset;
    }
    set dataset(value: any) {
        this._dataset = value;
        this._watcher('dataset', this.debug ? value : null);
    }

    private _words: Word[] = [];
    get words(): Word[] {
        return this._words;
    }
    set words(value: Word[]) {
        this._words = value;
        this._watcher('words', this.debug ? value : null);
    }

    private wordsIndex: IndexEntry[];
    private requestIndex: IndexEntry[];
    private indexes: WordlabIndex[] = [];
    private subIndexes: WordlabIndex[] = [];
    private scale: number = 1000;

    private mode: DispatchMode = 0;

    constructor(
        URI: string,
        PAGING: boolean,
        WATCHER: Watcher,
        UID: string | number,
        WORDSINDEX: IndexEntry[],
        INDEXES: IndexEntry[],
        SUBINDEXES: string[],
        SCALE: number | null,
        DEBUG: boolean | null,
        MODE: DispatchMode,
    ) {
        this._watcher = WATCHER;
        this.uid = UID;
        if (MODE) this.mode = MODE;
        if (SCALE) this.scale = SCALE;
        if (DEBUG) this.debug = DEBUG;
        if (PAGING) this.paging = PAGING;
        this.wordsIndex = WORDSINDEX;
        this.requestIndex = INDEXES;
        this.build(URI, INDEXES, SUBINDEXES);
    }
    private async build(URL: string, INDEXES: IndexEntry[], SUBINDEXES: string[]) {
        // todo fetch multi pages API so think about GET params for REST and GRAPHQL then checkout UID for reducer
        this.dataset = this.dataset.concat(await this.fetchDataset(URL)).filter((value: any, index: number, self: any) => {
            return self.findIndex((item: { id: any }) => item.id === value.id) === index;
        }); // reducer is important cause you cannot doublon UID
        // !! remove ID such  as static var from any dataset or llets try its work
        await this.setupIndexes(INDEXES);
        this.wordsReducer();
        this.wordsDispatcher();
    }
    private setupIndexes(indexes: IndexEntry[]): void {
        let iterator: number = 0;
        const indexAxis = ['X', 'Y', 'Z', 'RX', 'RY', 'RZ'];
        for (const index of indexes) {
            switch (index.type) {
                case 'string':
                    const indexSorted: [] = this._dataset
                        .map((data: { [x: string]: any }) => data[index.key])
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => {
                            return self.indexOf(value) === index && value !== '';
                        })
                        .sort((a: string, b: string) => {
                            if (a < b) {
                                return -1;
                            }
                            if (a > b) {
                                return 1;
                            }
                            return 0;
                        });
                    // DO not tokenize indexes is the simple way to find and dispatch indexes
                    // .map((w: string) => Tokenizer(w));
                    this.dispatchIndexes(indexSorted, indexAxis[iterator]);
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
                        .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== '')
                        // .map((w: string) => Tokenizer(w))
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== '');
                    this.dispatchIndexes(values, indexAxis[iterator]);
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
                                    .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value !== '');

                                this.dispatchIndexes(nests, indexAxis[iterator]);
                                break;
                        }
                    }
                    break;
                default:
                    /**
                     * for any others types like :
                     * sizes: number | string,
                     * dates: date | string,
                     * prices:number
                     * ... do not tokenize words and index original string parsed value for the order
                     */
                    const indexsSorted: [] = this._dataset
                        .map((data: { [x: string]: any }) => data[index.key].toString())
                        // tslint:disable-next-line: no-shadowed-variable
                        .filter((value: any, index: number, self: any) => {
                            return self.indexOf(value) === index && value !== '';
                        })
                        .sort((a: string, b: string) => {
                            if (a < b) {
                                return -1;
                            }
                            if (a > b) {
                                return 1;
                            }
                            return 0;
                        });
                    this.dispatchIndexes(indexsSorted, indexAxis[iterator]);
                    break;
            }
            iterator++;
        }
    }
    // Axis type will be one of enum such as : x, y, z, rx, ry, rz
    private dispatchIndexes(indexes: string[], AXIS: string): void {
        let angle = 0;
        const step = (2 * Math.PI) / indexes.length;
        for (const label of indexes) {
            let posX: number;
            let posY: number;
            let posZ: number;
            switch (AXIS) {
                case 'X':
                    posX = this.scale * Math.cos(angle);
                    posY = this.scale * Math.sin(angle);
                    (posZ = 0), Math.sin(angle);
                    break;
                case 'Y':
                    posX = this.scale * Math.cos(angle);
                    (posY = 0), Math.sin(angle);
                    posZ = this.scale * Math.sin(angle);
                    break;
                case 'Z':
                    (posX = 0), Math.sin(angle);
                    posY = this.scale * Math.sin(angle);
                    posZ = this.scale * Math.cos(angle);
                    break;

                // todo implement orientation such  as rx, ry, rz dispatcher to unlarge indexes
                default:
                    posX = this.scale * Math.cos(angle);
                    posY = this.scale * Math.sin(angle);
                    posZ = Math.sin(angle);
                    break;
            }
            // let amplitude = (this.setup.options.scale * this.getCount(key, indexes.length));
            // let amplitude = 0; //(this.setup.options.scale * this.getCount(key));
            this.indexes.push({
                label: label.toString(),
                pos: { x: posX, y: posY, z: posZ, rx: 0, ry: 0, rz: 0 },
                axis: AXIS,
            });
            angle += step;
        }
    }
    private wordsReducer = () => {
        // todo reduce each entry of @param WORDS to a tokenized uniq array entry
        // todo think about nested dataset entry
        let words: string = '';
        for (const set of this._dataset) {
            let innerWords: string = '';
            // lets loop on complete dataset
            for (const request of this.wordsIndex) {
                // lets loop on wordsIndex then get each values such as string or [array of strings]
                switch (request.type) {
                    case 'string':
                        words = `${words} ${set[request.key]}`; // sum each string to large
                        innerWords = `${words} ${set[request.key]}`; // sum each string to dataset index
                        break;
                    case 'array':
                        for (const word of set[request.key]) {
                            words = `${words} ${word}`; // sum each array string to large
                            innerWords = `${words} ${set[request.key]}`; // sum each string to dataset index
                        }
                        break;
                    default:
                        // TODO : get nested objects string || [array of strings]
                        // !! Ommit || ignore for beta need to implement global nested types
                        break;
                }
            }
            // WLwords is -OK
            // !! find who's innerword such as uniq by set of data (_dataset)
            // TODO : unset WLwords from _dataset
            set.WLwords = Tokenizer(innerWords)
                .split('-')
                .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value.length > 2);
        }
        const test = Tokenizer(words);
        const all = test
            .split('-')
            .filter((value: any, index: number, self: any) => self.indexOf(value) === index && value.length > 2);

        for (const word of all) {
            this.words.push({
                // value: "", // perhaps we need to get origin but don't know why for minified version
                token: word,
                pos: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 },
                weight: 0,
            });
        }
        // next step is to dispatch from _dataset
        return [];
    };
    private wordsDispatcher(): void {
        /**
         * what to do ?
         *  - get each words : this.words
         *  - get requested indexes
         *  - match requested index key to indexes position
         *  - get middle of each contained request posas axis point
         *  - setup word pos
         */
        for (const set of this._dataset) {
            for (const word of set.WLwords) {
                const points: Vector3D[] = [];
                const WORD = this.words.find((w) => w.token === word); // Word :
                for (const index of this.requestIndex) {
                    switch (index.type) {
                        case 'string':
                            const indexMove = this.indexes.find((i) => i.label === set[index.key]);
                            if (indexMove) points.push(indexMove.pos);
                            break;
                        case 'array':
                            if (Array.isArray(set[index.key])) {
                                for (const entry of set[index.key]) {
                                    const indexKey = this.indexes.find((i) => i.label === entry);
                                    if (indexKey) points.push(indexKey.pos);
                                }
                            }
                            break;
                        case 'object':
                            if (index.nest && index.nest.key && set[index.key] && set[index.key][index.nest.key]) {
                                const objectKey = this.indexes.find((i) =>
                                    index.nest ? i.label === set[index.key][index.nest.key] : false,
                                );
                                if (objectKey) points.push(objectKey.pos);
                            }
                            break;
                    }
                }
                if (WORD) WORD.pos = Middle(points);
            }
        }
    }
    private cleanUntil() {
        // todo cleanup app memory by cleaning each until entries to define here
    }
    private async fetchDataset(request: RequestInfo): Promise<any> {
        this.isLoading = true;
        const response = await fetch(request);
        try {
            const body = await response.json();
            this.isLoading = false;
            return body.data;
        } catch (err) {
            this.fetchError = err;
        }
    }
}
export default WordLab;
