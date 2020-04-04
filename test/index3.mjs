"use strict";
/**
 * Exemple 1 : avec un tout petit jeu de données
 * Remaining execution time < 2ms on firebase functions
 */
const start = new Date().getTime();
import WL from '../dist/WordLab';
import Articles from './articles_200.json';

const DB = new WL.WordLab(
    Articles,
    {
        scale: 100, // la taille de tes indexs
        keywords: ["post_content", "post_title"], // la liste des labels de type String à parser
        layers: { // layers from json kes input
            category: "category"
        }, // words`ll be setted by default
        index: "category",
        key_index: "ID",
        clean: true // boolean that return only last position or each vectors evolutions,
    },
    function (e, val) {
        // console.log('listener => ', JSON.stringify(e), " val => ", JSON.stringify(val));
        if (e === "Error")
            console.error(e, val);
        if (e === "output")
            console.warn(e, JSON.stringify(val));
        // console.log("premier => ", DB.search('premier'));
    }.bind(this)
);

DB.train();

/**
 * Tests => Articles sort by keywords
 */

let testSearch = async function () {
    console.log("TOP TIPS => ", await DB.search('Voici une bonne id\u00e9e pour faire passer la pilule'));
    /*
    console.log("second => ", await DB.search('second'));
    console.log('move user => ', DB.moveUser(0, [0, 0, 0])); 
    */
}
setTimeout(function () {
    testSearch();
}, 3000);


/* console.log('add user => ', DB.addUser());
console.log('add user => ', DB.addUser("StringID"));
console.log('add user => ', DB.addUser(97));
console.log('add user => ', DB.addUser()); */

/* console.log('add user => ', DB.addUser("Simon"));
console.log(`execution m ${new Date().getTime() - start}`);
console.log('DB training time => ', DB.execution); */