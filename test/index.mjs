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
        layers: { // les calques souhaités
            category: "category"
        }, // words is setted by default
        index: "category", // le nom de ton index (lorsqu'il n'y en a qu'un seul, oui oui on peu en avoir plusieurs...)
        clean: true // boolean that return only last position or each vectors evolutions
    },
    function (e, val) {
        if (e.error)
            console.error(e, val);
        if (e.warn)
            console.warn(e, val);
        // console.log("WordLab Logger => ", e, val);
    }.bind(this)
);

DB.train();

/**
 * Tu ne regardera jamais ces données sauf si tu veux faire un display de l'état de ta DB
 * donc voici comment obtenir les vectrices de ta base :
 * let wordLabDataset = DB.trainDataset(); // te retourne l'ensemble des vecteurs 3D pour chaque layer néttoyés ou pas selon la boolean clean
 */

/**
 * Tests => Trouver les articles en fonction de mots clés
 */

let test = async function () {
    console.log("premier => ", await DB.search('premier'));
    console.log("second => ", await DB.search('second'));
    console.log("troisieme => ", await DB.search('troisieme'));
    console.log("troisième => ", await DB.search('troisième'));
    console.log("XXX premier XXX => ", await DB.search('je cherche le premier article'));
    console.log("XXX second XXX => ", await DB.search('je cherche le second article'));
    console.log("XXX troisieme XXX => ", await DB.search('je cherche le troisieme article'));
}
test();
/* console.log("premier => ", DB.search('premier'));
console.log("troisieeme => ", DB.search('troisième')); */

console.log(`execution m ${new Date().getTime() - start}`);
console.log('DB training time => ', DB.execution);