"use strict";

/**
 * Exemple 3 créer un utilisateur et lui retourner l'article le plus pertinent...
 * On considère que le plus pertinent c'esst celui le plus proche et par default celui le plus proche de l'origine.
 * En effet la logique veut que tes contenus textes reflètent au mieux ton sujet / ton blog
 * donc par defaut les articles les plus génériques vont se retrouver de plus en plus vers le centre de ton blog donc vers ton sujet. 
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