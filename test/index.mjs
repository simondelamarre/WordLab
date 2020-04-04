"use strict";
/**
 * Exemple 1 : avec un tout petit jeu de données
 * Remaining execution time < 2ms on firebase functions
 */
const start = new Date().getTime();
import WL from '../dist/WordLab';
import Articles from './Articles';

const DB = new WL.WordLab(
    Articles,
    {
        scale: 100, // la taille de tes indexs
        keywords: ["label", "short_description", "intro"], // la liste des labels de type String à parser
        layers: { // layers from json kes input
            category: "category"
        }, // words`ll be setted by default
        index: "category", // test uniq index
        key_index: "id",
        clean: true // boolean that return only last position or each vectors evolutions
    },
    function (e, val) {
        console.log('listener => ', JSON.stringify(e));
        if (e.error)
            console.error(e, val);
        if (e.warn)
            console.warn(e, val);
    }.bind(this)
);

DB.train();

/**
 * Tests => Articles sort by keywords
 */

let testSearch = async function () {
    console.log("premier => ", await DB.search('premier'));
    /* console.log("second => ", await DB.search('second'));
    console.log('move user => ', DB.moveUser(0, [0, 0, 0]));

    console.log('add user => ', DB.addUser("Simon")); */
}
setTimeout(function () {
    testSearch();
}, 1000);


console.log(`execution m ${new Date().getTime() - start}`);