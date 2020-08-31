"use strict";
/**
 * Exemple 1 : avec un tout petit jeu de données
 * Remaining execution time < 2ms on firebase functions
 */
const start = new Date().getTime();
import WL from '../dist/WordLab.wrong';
import Articles from './Products';

const DB = new WL.WordLab(
    Articles,
    {
        scale: 100, // la taille de tes indexs
        keywords: ["description", "color", "type"], // la liste des labels de type String à parser
        layers: { // layers from json kes input
            category: "category"/* ,
            color: "color",
            sexe: "sexe",
            type: "type" */
        }, // words`ll be setted by default
        index: "category",
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
    /* console.log("TSHIRT ROUOGE => ", await DB.search('TSHIRT ROUGE'));
    console.log("second => ", await DB.search('second'));
    console.log('move user => ', DB.moveUser(0, [0, 0, 0])); 
    */
}
setTimeout(function () {
    testSearch();
}, 1000);


/* console.log('add user => ', DB.addUser());
console.log('add user => ', DB.addUser("StringID"));
console.log('add user => ', DB.addUser(97));
console.log('add user => ', DB.addUser()); */

/* console.log('add user => ', DB.addUser("Simon"));
console.log(`execution m ${new Date().getTime() - start}`);
console.log('DB training time => ', DB.execution); */