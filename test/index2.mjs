"use strict";

/**
 * Exemple 2 avec un peu de data histoire de comparer le temps d'éxecution de l'entrainement...
 * 500 keywords
 * 12 articles
 * 5 index
 * Remaining execution time < 18ms on firebase functions
 */

const start = new Date().getTime();
import WL from '../dist/WordLab';
import Articles from './Articles2';

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
console.log(DB.search('second article'));
console.log(DB.search('premier article'));
console.log(DB.search('troisième article'));

console.log(`execution m ${new Date().getTime() - start}`);
console.log('DB training time => ', DB.execution);