"use strict";
class WordLab {
    constructor(dataset, options, Observer) {
        this.setup = {};
        this.setup.dataset = dataset;
        this.setup.options = options;
        this._Observer = Observer;
        this.output = { words: [], properNames: [], indexed: [] };
        this.users = {}
    }
    // Getters
    get execution() {
        return this.end - this.start;
    }
    /* 
    get output() {
        return this.output;
    }
    get setup() {
        return this.setup;
    } 
    */
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
        this.output = this.formatDataset();
        // #2 dispatch static outputs
        this.dispatchIndexes();
        this.dispatchWords();
        this.dispatchEntries();

        this.end = new Date().getTime();
        if (this.setup.options.clean) {
            return this.cleanOutput();
        } else {
            return this.output;
        }
    }
    formatDataset() {
        var output = { words: [], properNames: [], indexed: [] };
        Object.keys(this.setup.options.layers).forEach(layer => output[layer] = []);
        // first run on dataset
        this.setup.dataset.forEach(function (item, index) {
            let words = [],
                properNames = [];
            let str = "";
            this.setup.options.keywords.forEach(keyword => str += item[keyword]);

            words.push(this.wordlab(str).words);
            output.words.push(this.wordlab(str).words);

            properNames.push(this.wordlab(str).names);
            output.properNames.push(this.wordlab(str).names);

            //setup layers
            Object.keys(this.setup.options.layers).forEach(
                layer => {
                    output[layer].push(item[this.setup.options.layers[layer]])
                }
            );
            output.indexed.push(item.id);
            // store article words only one time
            this.setup.dataset[index].words = this.uniq(words.join('-').split('-'));
            this.setup.dataset[index].names = this.uniq(properNames.join('-').split('-'));
        }.bind(this));
        // define output format with origin vector on each keys
        output.words = output.words.join('-').split('-');
        // Lets put origin on each entries
        Object.keys(output).forEach(key => output[key] = this.arrayToVector(this.uniq(output[key])));

        this.output = output;
        this._onPropertyChanged('output', output);
        return output;
    }
    cleanOutput() {
        let cleaned = {}
        Object.keys(this.output).forEach(function (entry) {
            cleaned[entry] = [];
            Object.keys(this.output[entry]).forEach(function (it) {
                cleaned[entry].push({ label: it, pos: this.lastIndex(this.output[entry][it]).map(x => parseFloat(x.toFixed(2))) });
            }.bind(this))
        }.bind(this));

        // this._onPropertyChanged('output', this.output);
        this.output = cleaned;
        return this.output;
    }
    dispatchIndexes() {
        // Les indexes sont dispatchés dans l'espace de façon circulaire avec une amplitude relative à leur influence ou plutôt au count total de chaque
        let ln = Object.keys(this.output[this.setup.options.index]).length,
            angle = 0,
            step = 2 * Math.PI / ln;
        Object.keys(this.output[this.setup.options.index]).forEach((key) => {
            let posX = (this.setup.options.scale * Math.cos(angle));
            let posY = (this.setup.options.scale * Math.sin(angle));
            let amplitude = (this.setup.options.scale * this.getCount(key, this.setup.options.index));
            // let amplitude = 0; //(this.setup.options.scale * this.getCount(key));
            this.output[this.setup.options.index][key].push([posX, posY, amplitude]);
            angle += step;
        });
        // this._onPropertyChanged('message', "index has been dispatched");
        return this.output;
    }
    dispatchWords() {
        // on parcours le dataset
        this.setup.dataset.forEach(function (item) {
            // puis chaque mot de chaque article pour faire évoluer la position du mot dans l 'espace
            item.words.forEach(word => {
                this.addVector(
                    this.output.words,
                    word,
                    this.lastIndex(this.output[this.setup.options.index][item.category]),
                    this.output.words.length
                )
            });
        }.bind(this));
    }
    dispatchEntries() {
        // on place les entrées du dataset de façon relative à leur index ou  categorie et à lleurs mots cles
        this.setup.dataset.forEach(function (item) {
            item.words.forEach(word => {
                this.addVector(
                    this.output.indexed,
                    item.id,
                    this.lastIndex(this.output.words[word]),
                    item.words.length
                ); // on déplace le vecteur selon l'influence du mot clé
            });
        }.bind(this));
    }
    addVector(target, key, point, factor, amplitude) {
        // note : on prend la derniere position du mot et on la soustrait au nouveau point d'influence de l'index en  cours
        // ou la catégorie dans le cas de bige post articles...
        // donc notre mot va se déplacer d'une catégorie vers une autre lorsqu'un article contient le mot en question
        if (target[key]) {
            let current = this.lastIndex(target[key]);
            if (!amplitude)
                amplitude = 1
            if (!factor)
                factor = 1;
            let newPoint = [
                ((point[0]) + current[0]) / 2,
                ((point[1]) + current[1]) / 2,
                ((point[2]) + current[2]) / 2
            ]
            target[key].push(newPoint);
        }
        // on ajoute la nouvelle position au target
        return true;
    }
    lastIndex(item) {
        return item[item.length - 1];
    }
    // eslint-disable-next-line no-unused-vars
    getCount(key, index) {
        return this.setup.dataset.filter(item => {
            return item.category === key;
        }).length;
    }
    arrayToVector(array) {
        let parsed = {}
        array.forEach(item => parsed[item] = [[0, 0, 0]])
        return parsed;
    }
    wordlab(paragraph) {
        // TODO IMPLEMENTER LES COEFFICIENTS
        /**
         * import adv from "adverbes"
         * - NC     : 2 (noms communs)
         * - NP     : 10 (noms propres)
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
        paragraph.forEach(function (word, index) {
            let str = word;
            // TODO mettre les noms propres dans un nouveau layer pour maéliorer les traitements plus importants... 
            /* let name = word;
            if (/[A-Z/]/.test(word[0]) !== -1 && /[A-Z/]/.test(paragraph[index + 1]) !== -1) {
                name += " " + paragraph[index + 1];
                names += name;
            } else { */
            if (str.length > 1 && !this.isPreposition(str)) {
                queryString += this.syllab(str.toLowerCase());
            }
            if (index < paragraph.length - 1) {
                queryString += "-"; // keyseparator
            }
            //}

        }.bind(this));

        return { words: queryString, names: names };
    }
    syllab(s) {
        var a = s.toLowerCase();
        // CHECK LES NOMS COMPOSES AVEC TRAIT D'function
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
        let exceptions = ["s", "x", "p", "d"];
        // eslint-disable-next-line no-self-assign
        exceptions.includes(a.slice(-1)) ? (a = a.substring(0, a.length - 1)) : (a = a);
        a = a.split("");

        var f = a.shift(),
            r = "",
            codes = {
                // voyelles
                a: 1,
                e: 1,
                i: 1,
                o: 1,
                u: 1,
                y: 1,
                // syllabes groupe #1
                b: 2,
                f: 2,
                p: 2,
                v: 2,
                // syllabes groupe #2
                c: 3,
                g: 3,
                j: 3,
                k: 3,
                q: 3,
                s: 3,
                x: 3,
                z: 3,
                // syllabes groupe #3
                d: 4,
                t: 4,
                h: "", // lettre muette ou accord non indispensable a la tokenisation
                w: 4,
                // syllabes groupe #4
                l: 5,
                // syllabes groupe #5
                m: 6,
                n: 6,
                // syllabes groupe #6
                r: 7,
                // Noms propres : seuls les noms + prénom = nom propres peuvent contenir un espace dans wordlab
                " ": 8
            };
        r = f + a
            // eslint-disable-next-line no-unused-vars
            .map(function (v, i, a) {
                return codes[v];
            })
            .filter(function (v, i, a) {
                return i === 0 ? v !== codes[f] : v !== a[i - 1];
            })
            .join("");
        return (r + "000").slice(0, 8).toUpperCase();
    }
    isPreposition(str) {
        // TODO rename as except, finallement c'est pas juste des preprosition en l'état mais des execptions de requete complexe indésirables...
        // le but est d'alléger au maximum les relations pour augmenter la vitesse de traitement...
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
        return str
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
        middle.map(value => value / points.length);
        return middle;
    }
    getNearestNeighbors(point, target) {
        let distances = target.sort((a, b) => {
            let distA = this.getDistance(point, a.pos);
            let distB = this.getDistance(point, b.pos);
            a.weight = distB - distA;
            b.weight = distB - distA;
            return distB - distA;
        });
        return distances.sort((a, b) => b.weight - a.weight);
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
    async search(words, userID) {

        let wordsArray = await this.wordlab(words).words.split('-'),
            output = [];

        await this.output.words.forEach(function (word) {
            wordsArray.forEach((w) => {
                if (word.label === w) output.push(word.pos);
            });
        }.bind(this));

        let point = this.getMiddle(output);
        let responses = this.getNearestNeighbors(point, this.output.indexed);
        this._onPropertyChanged('search', responses);
        if (output.length === 0)
            return { message: `words "${words}" not found`, result: responses };
        else
            return { message: "finds", result: responses };
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