import 'isomorphic-fetch'; // needed to fetch api from URI setup
import Wordlab from '../../../lib/index';
import Scene from "../3D/Scene";
import WLparams from "../Types/WLparams";
import { Vector3 } from 'three';
type Watcher = (name: string, value: any | null) => void;

class WordLabDemo {
    private container: HTMLElement;
    private params: WLparams = {
        searchInput: null,
        apiInput: null,
        indexesLabels: true,
        wordsLabels: false,
        resultscount: 10
    };

    public _isLoading: boolean = false;

    public Lab: Wordlab;

    get isLoading(): any {
        return this._isLoading;
    }
    set isLoading(value: any) {
        this._isLoading = value;
    }

    private _fetchError: any;
    get fetchError() {
        return this._fetchError;
    }
    set fetchError(value: any) {
        this._fetchError = value;
    }

    public _dataset: any = [];

    get dataset(): any {
        return this._dataset;
    }
    set dataset(value: any) {
        this._dataset = value;
    }

    private scene: Scene;


    private _result: any;
    get result(): any {
        return this._result;
    }
    set result(value: any) {
        this._result = value;
        this.emmiter("searchResult", value);
    }
    public emmiter: Watcher;
    private uid: string;

    constructor(URL: string, UID: string, CONTAINER: HTMLElement | null, PARAMS: WLparams | null, EMMITER: Watcher) {
        this.uid = UID;
        this.emmiter = EMMITER;
        if (PARAMS) this.params = PARAMS;
        (CONTAINER) ? this.container = CONTAINER : this.container = window.document.getElementsByTagName('body')[0];
        this.build(URL);
    }

    private async build(URL: string) {
        this.dataset = this.dataset.concat(await this.fetchDataset(URL));
        this.createLab();
    }
    private createLab(): void {
        this.Lab = new Wordlab(
            "", // Array of string : UrL API when you prefere let WordLab load your dataset or empty string
            this.dataset, // precise dataset if you prefere manage the dataset yourself or nullable
            false, // paging let Wordlab load paging from your api URL only without dataset setted
            { from: 0, to: 10, paging: "page", params: {}, headers: {} },
            (name, data) => {
                if (name === "ready") {
                    setTimeout(function () { this.createInterface(); }.bind(this), 500);
                }
            },
            this.uid, // uniq identifier key string from your json dataset
            [
                // list of words to parse and dispatch
                { type: "string", key: "label", nest: null },
                { type: "array", key: "tags", nest: null },
                { type: "string", key: "short_description", nest: null },
                { key: "publication", type: "date", nest: null },
            ],
            [
                // define indexed keys props : x, y, z, rx, ry, rz
                { key: "category", type: "string", nest: null },
                { key: "tags", type: "array", nest: null },
                { key: "publication", type: "date", nest: null },
                /* { key: "tags", type: "array", nest: null }, */
                /* { key: "author", type: "object", nest: { key: "id", type: "string" } }  */ // !important at this time only string and only one level
                // you can add only 2 more indexed level such as RY RZ...
                // others will be ignored in beta1 version
            ],
            [], // subindexes is under developpement...
            1,
            false,
            1,
            true,  // reduce dataset preserve only UID and geenerated Axis
            true, // simplify words remove accents and others special chars translation
            false // Wordlab Web  Worker  enable or disabled
        )
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
    private createInterface(): void {
        if (this.params.searchInput) {
            this.params.searchInput.addEventListener("keyup", this.search.bind(this));
        }
        if (this.params.apiInput)
            this.params.apiInput.addEventListener("blur", this.reload.bind(this));
        this.display3D();
    }
    private search(): void {
        const results: any = this.Lab.DB.search(this.params.searchInput.value, 10);
        if (results.target && results.result.length > 0 && results.result[0]) {
            this.scene.moveTarget(new Vector3(results.target.x, results.target.y, results.target.z));
            const articles = [];
            for (const res of results.result) {
                articles.push(this.dataset.find(d => d.id === res.id));
                articles[articles.length - 1].weight = res.weight;
            }
            this.result = articles;
        } else {
            this.scene.moveTarget(new Vector3(0, 0, 0));
            this.result = null;
        }
        // get first => results.result[0]
    }
    private similar(id: string): void {
        const results = this.Lab.DB.similar(id);
        // tslint:disable-next-line: no-console
        console.log('similar result ', results);
    }
    private reload(): void {
        // todo : reload api then reset wordlab with new dataset 
        // NOT AVAILABLE WITHOUT INDEX AND WordLab BINDING PARAMS
    }
    private display3D(): void {
        this.scene = new Scene(this.container, null, null, null, null, true, true);
        for (const index of this.Lab.DB.indexes) {
            this.scene.addIndex(index.pos, index.label);
        }
        for (const index of this.Lab.DB.words) {
            this.scene.addWord(index.pos, index.token);
        }
        for (const index of this.Lab.DB.dataset) {
            this.scene.addEntry(index.pos, index.id);
        }
    }
}

export = WordLabDemo;