"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WordLabDemo_1 = __importDefault(require("./Demos/WordLabDemo"));
document.addEventListener("DOMContentLoaded", function (event) {
    var demo = new WordLabDemo_1.default('http://127.0.0.1:5500/OLDER/bubblemag_2000.json', 'ID', window.document.getElementById('WL_container'), {
        apiInput: null,
        indexesLabels: false,
        resultscount: 10,
        searchInput: document.querySelector('#WL_search'),
        wordsLabels: false
    }, function (name, data) {
        if (name === "searchResult") {
            if (data) {
                document.querySelector('#result').innerHTML = "";
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var entry = data_1[_i];
                    document.querySelector('#result').innerHTML = document.querySelector('#result').innerHTML + entry.label + "  w: " + entry.weight + "<br>";
                }
                document.querySelector('#result').classList.add('opened');
            }
            else {
                document.querySelector('#result').innerHTML = "";
                document.querySelector('#result').classList.remove('opened');
            }
        }
    });
});
//# sourceMappingURL=index2.js.map