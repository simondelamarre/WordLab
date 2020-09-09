import 'isomorphic-fetch'; // needed to fetch api from URI setup
import WordLab from '../../../lib/index';
import Scene from "../3D/Scene";
import WLparams from "../Types/WLparams";

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

    public Lab: WordLab;

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

    constructor(URL: string, CONTAINER: HTMLElement | null, PARAMS: WLparams | null) {
        if (PARAMS) this.params = PARAMS;
        (CONTAINER) ? this.container = CONTAINER : this.container = window.document.getElementsByTagName('body')[0];
        this.build(URL);
    }

    private async build(URL: string) {
        this.dataset = this.dataset.concat(await this.fetchDataset(URL));
        this.createLab();
    }
    private createLab(): void {
        this.Lab = new WordLab(
            "", // Array of string : UrL API when you prefere let WordLab load your dataset or empty string
            this.dataset, // precise dataset if you prefere manage the dataset yourself or nullable
            false, // paging let Wordlab load paging from your api URL only without dataset setted
            { from: 0, to: 10, paging: "page", params: {}, headers: {} },
            (name, data) => {
                if (name === "ready") {
                    setTimeout(function () { this.createInterface(); }.bind(this), 500);
                }
            },
            "id", // uniq identifier key string from your json dataset
            [
                // list of words to parse and dispatch
                { type: "string", key: "label", nest: null },
                { type: "string", key: "short_description", nest: null },
                { type: "array", key: "tags", nest: null }
            ],
            [
                // define indexed keys props : x, y, z, rx, ry, rz
                // { key: "tags", type: "array", nest: null },
                { key: "category", type: "string", nest: null },
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
            true  // reduce dataset preserve only UID and geenerated Axis
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
        if (this.params.searchInput)
            this.params.searchInput.addEventListener("blur", this.search.bind(this));
        if (this.params.apiInput)
            this.params.apiInput.addEventListener("blur", this.reload.bind(this));
        this.display3D();
    }
    private search(): void {
        const results = this.Lab.search(this.params.searchInput.value);
    }
    private similar(id: string): void {
        const results = this.Lab.similar(id);
    }
    private reload(): void {
        // todo : reload api then reset wordlab with new dataset 
        // NOT AVAILABLE WITHOUT INDEX AND WordLab BINDING PARAMS
    }
    private display3D(): void {
        this.scene = new Scene(this.container, null, null, null, null, true, true);
        for (const index of this.Lab.indexes) {
            this.scene.addIndex(index.pos, index.label);
        }
        for (const index of this.Lab.words) {
            this.scene.addWord(index.pos, index.token);
        }
        for (const index of this.Lab.dataset) {
            this.scene.addEntry(index.pos, index.id);
        }
    }
}

export = WordLabDemo;