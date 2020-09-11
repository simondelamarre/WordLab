/**
 * attempt...
 */

import WordLabDemo from "./Demos/WordLabDemo";

document.addEventListener("DOMContentLoaded", (event) => {
    const demo = new WordLabDemo(
        //  'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
        'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
        'ID',
        window.document.getElementById('WL_container'), // target container
        {
            apiInput: null,
            indexesLabels: false,
            resultscount: 10,
            searchInput: document.querySelector('#WL_search'),
            wordsLabels: false
        }, // WLparams default values
        (name, data) => {
            // tslint:disable-next-line: no-console
            // console.log(name, data)
            if (name === "searchResult") {
                if (data) {
                    document.querySelector('#result').innerHTML = "";
                    for (const entry of data) {
                        document.querySelector('#result').innerHTML = document.querySelector('#result').innerHTML + entry.label + "  w: " + entry.weight + "<br>";
                        // data.label; // JSON.stringify(data);
                    }
                    document.querySelector('#result').classList.add('opened');
                } else {
                    document.querySelector('#result').innerHTML = "";
                    document.querySelector('#result').classList.remove('opened');
                }
            }
        }
    );
});

/*
TODO DEMO need more setup from WordLabDemo...
document.addEventListener("DOMContentLoaded", (event) => {
    const demo = new WordLabDemo(
        //  'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
        'http://127.0.0.1:5500/OLDER/bubblemag_2000.json', // demo api get dataset
        'ID',
        window.document.getElementById('WL_container'), // target container
        {
            apiInput: null,
            indexesLabels: false,
            resultscount: 10,
            searchInput: document.querySelector('#WL_search'),
            wordsLabels: false
        }, // WLparams default values
        (name, data) => {
            // tslint:disable-next-line: no-console
            // console.log(name, data)
            if (name === "searchResult") {
                if (data) {
                    document.querySelector('#result').innerHTML = "";
                    for (const entry of data) {
                        document.querySelector('#result').innerHTML = document.querySelector('#result').innerHTML + entry.label + "  w: " + entry.weight + "<br>";
                        // data.label; // JSON.stringify(data);
                    }
                    document.querySelector('#result').classList.add('opened');
                } else {
                    document.querySelector('#result').innerHTML = "";
                    document.querySelector('#result').classList.remove('opened');
                }
            }
        }
    );
});
 */