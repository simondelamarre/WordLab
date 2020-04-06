/* eslint-disable no-unused-vars */
"use strict";

const REGLES = require("../dist/WordTypes_FR");
class WordLab {
    constructor(dataset, options, Observer) {
        this.setup = {};
        this.setup.dataset = dataset;
        this.setup.options = options;
        this._Observer = Observer;
        this.output = { words: [], indexed: [] };
        this.users = {}
    }
    // Getters
    get execution() {
        return this.end - this.start;
    }
    // Setters
    set area(val) {
        this.area = val;
        // this._onPropertyChanged('area', val);
    }
    // Methods
    async train() {
        this.start = new Date().getTime();
        if (!this.setup.options.index || this.setup.options.index.length === 0)
            return this._onPropertyChanged('Error', "You must define an index in the wordLab instance options");
        if (!this.setup.options.keywords || this.setup.options.keywords.length === 0)
            return this._onPropertyChanged('Error', "You must defined each object string keys to convert as vector in options keywords[]");
        // #1 format output layers
        this.output = await this.formatDataset();
        // #2 dispatch static outputs
        await this.dispatchIndexes();
        await this.dispatchWords();
        await this.dispatchEntries();

        this.end = new Date().getTime();
        if (this.setup.options.clean) {
            let cleaned = await this.cleanOutput();
            this.output = cleaned;
            this._onPropertyChanged('output', cleaned);
            return this.output;
        } else {
            this._onPropertyChanged('output', this.output);
            return this.output;
        }
    }
    async formatDataset() {
        var output = { words: [], indexed: [] };
        Object.keys(this.setup.options.layers).forEach(layer => output[layer] = []);
        // first run on dataset
        let index = 0;
        for await (let item of this.setup.dataset) {
            // await this.setup.dataset.forEach(function (item, index) {
            let words = [];
            let str = "";
            this.setup.options.keywords.forEach(keyword => str += item[keyword]);

            let WLAB = await this.wordlab(str);
            words.push(WLAB.words);
            output.words.push(WLAB.words);

            //setup layers
            Object.keys(this.setup.options.layers).forEach(
                layer => {
                    output[layer].push(item[this.setup.options.layers[layer]])
                }
            );
            output.indexed.push(item[this.setup.options.key_index]);

            this.setup.dataset[index].words = this.uniq(words.join('-').split('-'));
            index++;
        }; //.bind(this));
        // define output format with origin vector on each keys
        output.words = output.words.join('-').split('-');
        // Lets put origin on each entries
        for await (let key of Object.keys(output)) {
            output[key] = this.arrayToVector(this.uniq(output[key]));
        }
        // await Object.keys(output).forEach(key => output[key] = this.arrayToVector(this.uniq(output[key])));

        return output;
    }
    async cleanOutput() {
        let cleaned = {}
        await Object.keys(this.output).forEach(async function (entry) {
            cleaned[entry] = [];
            await Object.keys(this.output[entry]).forEach(async function (it) {
                cleaned[entry].push({ label: it, pos: this.lastIndex(this.output[entry][it]).map(x => parseFloat(x.toFixed(2))) });
            }.bind(this))
        }.bind(this));
        this.output = cleaned;
        return this.output;
    }
    async dispatchIndexes() {
        // Les indexes sont dispatchés dans l'espace de façon circulaire avec une amplitude relative à leur influence ou plutôt au count total de chaque
        let ln = Object.keys(this.output[this.setup.options.index]).length,
            angle = 0,
            step = 2 * Math.PI / ln;
        Object.keys(this.output[this.setup.options.index]).forEach((key) => {
            let posX = (this.setup.options.scale * Math.cos(angle));
            let posY = (this.setup.options.scale * Math.sin(angle));
            // let posZ = Math.sin(angle);
            let amplitude = (this.setup.options.scale * this.getCount(key, this.setup.options.index));
            // let amplitude = 0; //(this.setup.options.scale * this.getCount(key));
            this.output[this.setup.options.index][key].push([posX, posY, amplitude]);
            angle += step;
        });
        return this.output;
    }
    async dispatchWords() {
        // on parcours le dataset

        // foreach words word 
        // word.move category

        for await (let item of this.setup.dataset) { // }.forEach(async function (item) {
            for await (let word of item.words) { //}.forEach(word => {
                this.addVector(
                    this.output.words,
                    word,
                    this.lastIndex(this.output.category[item.category]),
                    this.output.words.length
                )
            } // );
        }// .bind(this));
        return this.output;
    }
    async dispatchEntries() {
        // on place les entrées du dataset de façon relative à leur index ou  categorie et à lleurs mots cles
        for await (let item of this.setup.dataset) { // .forEach(async function (item) {
            // first move in category
            // TODO IMPORTANT check ! vérifier si on dois placer les articles sur la position de la catégorie ou non... 
            /* if (this.output.indexed[item[this.setup.options.key_index]].length === 1) {
                this.output.indexed[item[this.setup.options.key_index]].push(this.lastIndex(this.output.category[item.category]));
            } */
            for await (let word of item.words) { //.forEach(async word => {
                await this.addVector(
                    this.output.indexed,
                    item[this.setup.options.key_index],
                    this.lastIndex(this.output.words[word]),
                    item.words.length
                ); // on déplace le vecteur selon l'influence du mot clé
            } // );
        }//.bind(this));
    }
    async addVector(target, key, point, factor, amplitude) {
        // note : on prend la derniere position du mot et on la soustrait au nouveau point d'influence de l'index en cours
        if (target[key]) {
            if (target[key].length === 1) {
                target[key].push(point);
                return point;
            }
            let current = this.lastIndex(target[key]);
            /* if (!amplitude)  
                amplitude = 1 */
            /* if (!factor)
                factor = 1; */
            let newPoint = [
                ((point[0]) + current[0]) / 2,
                ((point[1]) + current[1]) / 2,
                ((point[2]) + current[2]) / 2
            ]
            target[key].push(newPoint);
            return newPoint;
        } else {
            return false;
        }

    }
    lastIndex(item) {
        if (typeof item === 'undefined')
            return [0, 0, 0];
        return item[item.length - 1];
    }
    // eslint-disable-next-line no-unused-vars
    getCount(key, index) {
        return this.setup.dataset.filter(item => {
            return item[index] === key;
        }).length;
    }
    arrayToVector(array) {
        let parsed = {}
        array.forEach(item => parsed[item] = [[0, 0, 0]])
        return parsed;
    }
    async wordlab(paragraph) {
        // TODO IMPLEMENTER LES COEFFICIENTS
        /**
         * import adv from "WordType_FR"
         * - NC     : 2 (noms communs)
         * - NP     : 9 (noms propres)
         * - PRON   : 1 (pronoms)
         * - ND     : 1 (undefined)
         * - ADV    : 1 (adverbes)
         * - INTJ   : 4 (interjections)
         * - TOX    : 360° radius toxicity
         */


        if (typeof paragraph !== "string") {
            return "";
        }
        paragraph = this.cleanStr(paragraph).split(' ');

        let queryString = "";
        let names = "";
        for await (let word of paragraph) { // .forEach(async function (word, index) {
            let str = word;
            // TODO mettre les noms propres dans un nouveau layer pour maéliorer les traitements plus importants... 
            /* let name = word;
            if (/[A-Z/]/.test(word[0]) !== -1 && /[A-Z/]/.test(paragraph[index + 1]) !== -1) {
                name += " " + paragraph[index + 1];
                names += name;
            } else { */

            if (/\b[A-Z]+\b/.test(str) || /\w*[A-Z]\w*[A-Z]\w*/g.test(str)) {
                // les mots en FULL CAPITAL ou avec plusieurs capitales SONT AJOUTES EN ENTIER et systematiquement
                queryString += str;
            } else if (!this.isPreposition(str)) {
                // queryString += await this.syllab(str);
                queryString += await this.syllab(str.toLowerCase());
            }
            queryString += "-";
            /* if (index < paragraph.length - 1) {
                queryString += "-"; // keyseparator
            } */
            //}

        } // .bind(this));
        queryString = queryString.slice(0, queryString.length - 1);
        return { words: queryString, names: names };
    }
    removeSpecialChars(str) {
        let output = str
            .toLowerCase()
            .replace(/[àáâãäå]/gi, "a")
            .replace(/[éèëê]/gi, "e")
            .replace(/[ïîì]/gi, "i")
            .replace(/[òöôoõ]/gi, "o")
            .replace(/[üûù]/gi, "u")
            .replace(/[ñ]/gi, "n")
            .replace(/[ç]/gi, "c")
            .replace(/[ ]/gi, "-")
            .replace(/[^a-z0-9/-]/gi, "");
        return output;
    }
    async syllab(s) {
        var a = s;
        // CHECK LES NOMS COMPOSES AVEC TRAIT D'function
        // phonetik reducer list
        // TODO ignorer les H muets
        if (REGLES.haspires.indexOf(a))
            a.replace(/h/g, "");

        if (REGLES.invariables.indexOf(a) && a.slice(a.length - 1, a.length) === "s")
            a = a.slice(0, a.length - 1);

        let coefficient = REGLES.getCoefficient(a);
        // let a = "autrement";
        a = await this.phonetise(a);

        // a = a.toLowerCase();

        if (a.split("-").length > 0) {
            var w = a.split("-"),
                m = "";
            for (var i = 0; i < w.length; i++) {
                w[i].slice(-1) === "s"
                    ? (w[i] = w[i].substring(0, w[i].length - 1))
                    : // eslint-disable-next-line no-self-assign
                    (w[i] = w[i]);
                m += w[i];
            }
            a = m;
        }
        // let exceptions = ["s", "x", "p", "d"];
        // eslint-disable-next-line no-self-assign
        // exceptions.includes(a.slice(-1)) ? (a = a.substring(0, a.length - 1)) : (a = a);
        a = a.split("");

        var f = a.shift(),
            r = "",
            codes = {
                // group 1
                a: 0,
                e: 0,
                i: 0,
                o: 0,
                u: 0,
                y: 0,
                // group 2
                b: 1,
                f: 1,
                p: 1,
                v: 1,
                // group 3
                c: 2,
                g: 2,
                J: 2,
                k: 2,
                q: 2,
                s: 2,
                x: 2,
                z: 2,
                // group 4
                d: 3,
                t: 3,
                h: 3,
                W: 3,
                w: 3,
                // group 5
                l: 4,
                // group 6
                m: 5,
                n: 5,
                // group 7
                r: 6,
                //  exeptions group
                ʒ: "A",
                ɛ̃: "B",
                ɛ: "C",
                ɔ̃: "D",
                ɲ: "E",
                ʀ: "F",
                º: "G",
                ɔ̃: "H",
                ʃ: "I",
                ɐ: "J",
                1: "K",
                ʒ: "L",
                v: "M",
                A: "N",
                Ω: "O",
                δ: "P",
                β: "Q",
                Y: "R",
                S: "S",
                E: "T",
                G: "U",
                ñ: "V"
            }

        r = f + a
            // eslint-disable-next-line no-unused-vars
            .map(function (v, i, a) {
                return codes[v];
            })
            .filter(function (v, i, a) {
                return i === 0 ? v !== codes[f] : v !== a[i - 1];
            })
            .join("");

        return r; (r).toUpperCase();
    }
    async phonetise(a) {
        let phonetik = {
            a: ["à", "á", "â", "ã", "ä", "å", "ae", "æ", "h<a", "h<â", "h<u", "h<o"], // A
            x: ["x>o", "x>i", "x>a", "x>e", "cc>a", "cc>e", "cc>i", "cc>o", "cc>u", "cc>y"], // KS
            ɔ̃: ["ion!>n", "ion!>e", "yon!>e", "yon!>n"],
            o: [">>aux", ">>eaux", "eau", "au", "ô", "ò", "ö", "ô", "õ"], // O
            Y: ["t!<ill", "r!<ill", "o<ill", "e<ill", "ai<ll", "ai<l", "a<y", "y>e", "y>a", "ill>a", "ill>e", "ill>o"], // Y
            W: ["kw", "quw", "qw"], // W
            G: ["gu"],
            k: [">>que", "qu", "ch>r", "ch>o", "ch>ia", "ck", "x>i", "c>t", "cc>a"], // K 
            ɲ: ["gn>e", "gn>a", "gn>o"], // GN
            ʀ: ["é<r", "è<r", "ë<r", "ê<r", "rr", "aire", ">>ert"], // R
            ɛ̃: ["ai!>ne", "ai>me", "i<en", "h<é", "h<è", "h<ê", "er>n", "er>r", "er>a", "er>e", "er>é", "er>i", "er>o", "er>u"], // É
            S: ["ss", "ç", "sc>e"], // S
            ɛ: ["t>e", ">>ez", ">>ais", ">>ait", "e>f", ">>er", "ai>n", "ai!>e", "ai!>o", "ai>r", ">>aient", ">>ées", ">>ée", "é", "è", "ë", "ê"], // É
            t: ['th'], // T
            º: ["ou"], // OU
            J: ["i<lle"], // Jx@
            ɔ̃: ["on!>n"], // ON
            ʃ: ["ch", "sch", "sh"], // CH
            ɐ: ["ng"], // ng
            1: ["ain", "ein", "un>[CONS]", "in>[CONS]", "im>[CONS]"],
            ʒ: ["dj", "j>ean"], // DJ
            ʒ: ["gi", "gy", "a<ge", "e<ge", "i<ge", "o<ge", "u<ge", "n<ge"], // J
            L: ["ai!<ll", "ei!<ll", "ui!<ll", "oi!<ll", "e<l", "é<l", "ë<l", "ê<l"], // L
            i: ["y!<a", "y!<a", "y!<o", "y!<u", "î", "ï", "ì"], // i
            v: ["w>a"], // v
            A: ['aon', '>>ant', "an!>c", "an!>t", "an!>n", "an!>a", "an!>e", "an!>i", "an!>o", "an!>u", "en!>e", "em>m", "an"], // AN
            f: ["ph>a", "ph>i", "ph>o", "ph>e", "ph>u", "ph>y"], // f
            Ω: ["om>m", "om>p", "om>pt", "om>e", "om>o", "om>i", "om>a", "om>u", "om>y"],
            E: ["oe", "œ", "oeu", "œu", "eu", "e!>i", "ie!>l", ">>eux", ">>ent"], // E
            m: ["mm"],
            z: ["s>i", "s>o"],
            δ: ["tion"],
            β: ["bou", "bout"],
            p: ["pp"],
            u: ['ü', "û", "ù"],
            ñ: ["gn"]
        }
        Object.keys(phonetik).forEach(key => {
            let w = a;
            for (let s in phonetik[key]) {
                let song = phonetik[key][s],
                    replaced = false;

                // les negation avant
                if (song.indexOf("!<") !== -1) {
                    // n'est pas précédé par
                    let split = song.split('!<');
                    if (w.slice(w.indexOf([split[1]]) - split[0].length, split[0].length) === split[0])
                        w = w.replace(new RegExp(split[1], "g"), key);
                    replaced = true;
                }
                if (song.indexOf("!>") !== -1 && replaced === false) {
                    // n'est pas suivi de
                    let split = song.split('!>');
                    if (w.slice(w.indexOf([split[0]]) - split[1].length, split[1].length) === split[1])
                        w = w.replace(new RegExp(split[0], "g"), key);
                    replaced = true;
                }
                // ensuite tout ce qui commence par
                if (song.indexOf(">>") !== -1 && replaced === false) {
                    // se termine par
                    let split = song.split('>>');
                    if (w.slice(w.indexOf([split[1]]), w.length) === split[1]) {
                        w = w.slice(0, w.indexOf([split[1]])) + key;
                        // new RegExp(split[0], "g"), key);
                    }
                    replaced = true;
                }
                if (song.indexOf("<<") !== -1 && replaced === false) {
                    // est précédé de
                    let split = song.split("<<");
                    if (w.slice(w.indexOf([split[0]]), split[0].length) === split[0])
                        w = w.replace(new RegExp(split[1], "g"), key);
                    replaced = true;
                }
                // puis les exceptions
                if (song.indexOf("<") !== -1 && replaced === false) {
                    // est précédé de
                    let split = song.split('<');
                    if (w.slice(w.indexOf([split[1]]) - split[1].length, split[0].length) === split[0])
                        w = w.replace(new RegExp(split[1], "g"), key);
                    replaced = true;
                }
                if (song.indexOf(">") !== -1 && replaced === false) {
                    // est suivi de
                    let split = song.split('>');
                    let nextLetter = w.slice(w.indexOf([split[0]]) + split[0].length, split[1].length);

                    /* if (key === '[CONS]') {
                        nextLetter = w.slice(w.indexOf([split[0]]) + split[0].length, w.indexOf([split[0]]) + split[0].length + 1);
                        if (/bcdgklmnpqrstvwxz/.test(nextLetter))
                            w = w.replace(new RegExp(split[0], "g"), key);
                    } else if (key === '[VOY]') {
                        nextLetter = w.slice(w.indexOf([split[0]]) + split[0].length, w.indexOf([split[0]]) + split[0].length + 1);
                        if (/aeiouy/.test(nextLetter))
                            w = w.replace(new RegExp(split[0], "g"), key);
                    } else  */
                    if (nextLetter === split[1]) {
                        w = w.replace(new RegExp(split[0], "g"), key);
                    }
                    replaced = true;
                }
                // si rien n'a changé on remplace par default
                if (replaced === false && w.indexOf(song) !== -1) {
                    w = w.replace(new RegExp(song, "g"), key);
                }
                a = w;
            }
        });

        return a;
    }
    isPreposition(str) {
        // TODO rename as except, finallement c'est pas juste des preprosition en l'état mais des execptions de requete complexe indésirables...
        // le but est d'alléger au maximum les relations pour augmenter la vitesse de traitement...
        if (/[A-Z]/g.test(str) === true) {
            return false;
        }

        if (/’'ʼ/g.test(str)) {
            return true;
        }

        let prep = ["je", "tu", "il", "nous", "vous", "ils", "elles", "ont", "à", "les", "la", "le", "pas", "des", "une", "unes", "est", "son", "sa", "ses", "aux", "car", "et", "que", "qui", "quoi", "quand", "comment", "après", "avant", "avec", "chez", "contre", "dans", "de", "derrière", "devant", "en", "entre", "excepté", "malgré", "moyennant", "outre", "par", "parmi", "passé", "pendant", "pour", "sans", "sauf", "selon", "sous", "suivant", "sur", "vers", "vu", "entre", "sans"];
        if (prep.includes(str.toLowerCase()) || str.length <= 2 || parseInt(str) || parseFloat(str)) //  inférieur à 2 chars = poubelle ainsi que les nombres qui n'auront pas de sens
            return true;
        else
            return false;
    }
    getPoint(contrainst, key) {
        return { contrainst: contrainst, key: key };
    }
    setPoint(target) {
        target.push[{ x: 0, y: 0, z: 0 }];
    }
    cleanStr(str) {
        // TODO strip html return text only
        // paragraph = paragraph.replace(/<\/?[^>]+(>|$)/g, "");
        return str
            .replace(/<\/?[^>]+(>|$)/g, "")
            .replace(/[,:;"'’،、…⋯‘’“”""«»()+-=%[{}¿?!.]/g, " ") // release ponctuation
            .replace(/\n/g, " "); // release lines
    }
    uniq(array) {
        // .join('-').split('-') DATES ?
        return array.filter((value, index, self) => {
            return self.indexOf(value) === index && value !== "";
        })
    }
    getMiddle(points) {
        let middle = [0, 0, 0];
        points.forEach(function (point) {
            middle[0] += point[0];
            middle[1] += point[1];
            middle[2] += point[2];
        });
        // middle[0] = middle[0] % points.length;
        middle[0] = middle[0] / points.length;
        middle[1] = middle[1] / points.length;
        middle[2] = middle[2] / points.length;

        // middle.map(value => value % points.length);
        return middle;
    }
    getNearestNeighbors(point, target) {
        let distances = [];
        for (let item of target) {
            item.weight = this.getDistance(point, item.pos);
            distances.push(item);
        }
        /* let distances = target.sort((a, b) => {
            let distA = this.getDistance(point, a.pos);
            let distB = this.getDistance(point, b.pos);
            a.weight = distB - distA;
            b.weight = distB - distA;
            return distB - distA;
        }); */
        return distances.sort((a, b) => a.weight - b.weight);
    }
    jsonKeyToLabelValue(input) {
        let output = [];
        Object.keys(input).forEach(entry => {
            output.push({ label: entry, value: input[entry] });
        });
        return output;
    }
    getDistance(a, b) {
        if (!b)
            return a;

        /* var dx = a[0] - b[0];
        var dy = a[1] - b[1];
        var dz = a[2] - b[2];

        return Math.sqrt(dx * dx + dy * dy + dz * dz); */
        return Math.sqrt(
            ((a[0] - b[0]) * (a[0] - b[0])) +
            ((a[1] - b[1]) * (a[1] - b[1])) +
            ((a[2] - b[2]) * (a[2] - b[2]))
        );
    }
    // Observer : return each changes
    _onPropertyChanged(propName, val) {
        this._Observer(propName, val);
        return this[propName];
    }
    // eslint-disable-next-line no-unused-vars
    async search(words, userID) {
        let WP = await this.wordlab(words);
        let wordsArray = WP.words.split('-'),
            output = [];

        wordsArray.forEach((w) => {
            let exist = this.output.words.filter(word => word.label === w);
            if (exist.length === 1) {
                output.push(exist[0].pos);
            }
        });
        let point;
        if (output.length === 1)
            point = output[0];
        else
            point = this.getMiddle(output);


        let responses = this.getNearestNeighbors(point, this.output.indexed);

        // responses = responses.sort((a, b) => Math.abs(a.weight) - Math.abs(b.weight));
        this._onPropertyChanged('search', responses);
        if (output.length === 0)
            return { message: `words "${words}" not found`, result: responses };
        else
            return { message: "finds", result: responses };
    }
    similar(point) {
        let responses = this.getNearestNeighbors(point, this.output.indexed);
        this._onPropertyChanged('similar', responses);
        return { message: "similar", result: responses };
    }
    addUser(id) {
        if (id && this.users[id] || !id === true) {
            id = Object.keys(this.users).length;
        }
        this.users[id] = [0, 0, 0];
        return id;
    }
    moveUser(id, point, type) {
        if (!id)
            id = Object.keys(this.users)[0];

        if (!point || !Array.isArray(point) || point.length !== 3 || typeof point[0] !== "number" || typeof point[1] !== "number" || typeof point[2] !== "number")
            return "need a vector 3D point";

        if (!type)
            type = "slice"

        switch (type) {
            case "rebase":
                // move to points
                this.users[id] = point;
                return `rebased at => ${point}`;
            default:
                // move to middle AB->
                this.users[id] = this.getMiddle([this.users[id], point]);
                return "sliced " + JSON.stringify(this.users[id]);
        }
    }
}

exports.WordLab = WordLab;