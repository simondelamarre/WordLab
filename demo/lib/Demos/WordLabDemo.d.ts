import 'isomorphic-fetch';
import WordLab from '../../../lib/index';
import WLparams from "../Types/WLparams";
declare class WordLabDemo {
    private container;
    private params;
    _isLoading: boolean;
    Lab: WordLab;
    get isLoading(): any;
    set isLoading(value: any);
    private _fetchError;
    get fetchError(): any;
    set fetchError(value: any);
    _dataset: any;
    get dataset(): any;
    set dataset(value: any);
    private scene;
    constructor(URL: string, CONTAINER: HTMLElement | null, PARAMS: WLparams | null);
    private build;
    private createLab;
    private fetchDataset;
    private createInterface;
    private search;
    private similar;
    private reload;
    private display3D;
}
export = WordLabDemo;
