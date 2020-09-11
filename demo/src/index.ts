/**
 * in this demo 
 * - load a json dataset from bige.deev articles open api
 * - display a 3D preview to understand and watch any vectors position
 * - TODO : try out with 'http://127.0.0.1:5500/OLDER/bubblemag_2000.json'
 * - 400 wordpress articles demo
 */

import WordLabDemo from "./Demos/WordLabDemo";

document.addEventListener("DOMContentLoaded", (event) => {
    const demo = new WordLabDemo(
        'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
        'id',
        window.document.getElementById('WL_container'), // target container
        {
            apiInput: null,
            indexesLabels: false,
            resultscount: 10,
            searchInput: document.querySelector('#WL_search'),
            wordsLabels: false
        }, // WLparams demo default values
        (name, data) => {
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