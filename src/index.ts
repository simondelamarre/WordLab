/**
 * Wordlab reduce large text dataset
 * define multiple indexes
 * allow you to search better and faster
 * @param URI : string => API call to load default dataset
 */
import WordlabIndex from "./types/WordlabIndex"
import Tokenizer from "./Words/Tokenizer"
import IndexOrientation from "./types/IndexOrientation"
import Word from "./types/Word";
import Axis from "./types/Axis";

class WordLab {
    private url: string;
    private dataset: object = [];
    private words: Word[] = [];
    private indexes: WordlabIndex[] = [];
    private subIndexes: WordlabIndex[] = [];
    private scale: number = 1000;
    constructor(URI: string, indexes: IndexOrientation[], subIndexes: IndexOrientation[], scale: number | null) {
        this.url = URI;
        if (scale)
            this.scale = scale;
        /* for (const id in indexes) {
            this.indexes.push({
                index: parseInt(id),
                label: indexes[id].label.toString(),
                pos: { x: 0, y: 0, z: 0 },
                axis: Axis["X"],
                subIndexes: null
            })
        } */
    }
    private loadDataset = async () => {
        // call URI api to get dataset
    }
    public indexGroups = (label: string) => {
        // return labels list from dataset label entry
    }
    public getWords = () => {

    }
}
export = WordLab