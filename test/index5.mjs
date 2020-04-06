"use strict";
/**
 * Exemple 1 : avec un tout petit jeu de données
 * Remaining execution time < 2ms on firebase functions
 */
const start = new Date().getTime();
import WL from '../dist/PhoneLab';
import Articles from './bige_articles.json';

const DB = new WL.WordLab(
    Articles,
    {
        scale: 100, // la taille de tes indexs
        keywords: ["label", "intro", "category", "markdown", "tags"], // la liste des labels de type String à parser
        layers: { // layers from json kes input
            category: "category"
        }, // words`ll be setted by default
        index: "category",
        key_index: "id",
        clean: true // boolean that return only last position or each vectors evolutions,
    },
    function (e, val) {
        // console.log('listener => ', JSON.stringify(e), " val => ", JSON.stringify(val));
        if (e === "Error")
            console.error(e, val);
        if (e === "output")
            testSearch();
        // console.warn(e, JSON.stringify(val));



        // console.log("premier => ", DB.search('premier'));
    }
);

DB.train();

/**
 * Tests => Articles sort by keywords
 */

let testSearch = async function () {
    console.log("****************************");

    let search = await DB.search('BULLSHIT');
    console.log('BULLSHIT');
    logresponses(search);

    console.log("****************************");
    console.log("SIMILAR ", DB.output.indexed[0]);
    let similar = await DB.similar(DB.output.indexed[0].pos);
    logresponses(similar);

    console.log("****************************");
    console.log("SIMILAR CAT ", DB.output.category[0]);
    similar = await DB.similar(DB.output.category[0].pos);
    logresponses(similar);

    console.log("****************************");
    console.log("SIMILAR CAT ", DB.output.category[1]);
    similar = await DB.similar(DB.output.category[1].pos);
    logresponses(similar);

    console.log("****************************");
    console.log("SIMILAR CAT ", DB.output.category[2]);
    similar = await DB.similar(DB.output.category[2].pos);
    logresponses(similar);

    console.log("****************************");
    console.log("SIMILAR CAT ", DB.output.category[3]);
    similar = await DB.similar(DB.output.category[3].pos);
    logresponses(similar);
}
let logresponses = function (search) {
    for (var i = 0; i < 5; i++) {
        console.log(search.result[i]);
        console.log(" => ", search.result[i].weight, search.result[i].label, Articles.filter(function (art) { return art.id == search.result[i].label })[0].label);
    }
}

setTimeout(function () {
    // testSearch();
}, 3000);


/* console.log('add user => ', DB.addUser());
console.log('add user => ', DB.addUser("StringID"));
console.log('add user => ', DB.addUser(97));
console.log('add user => ', DB.addUser()); */

/* console.log('add user => ', DB.addUser("Simon"));
console.log(`execution m ${new Date().getTime() - start}`);
console.log('DB training time => ', DB.execution); */