import WordLab from '../dist/WordLab';
import Articles from './Articles';

const DB = new WordLab(
    Articles,
    {
        scale: 100, // la taille de tes indexs
        keywords: ["label", "short_description", "intro"], // la liste des labels de type String à parser
        layers: { // les calques souhaités
            categories: "category"
        }, // words is setted by default
        index: "categories", // le nom de ton index (lorsqu'il n'y en a qu'un seul, oui oui on peu en avoir plusieurs...)
        clean: true // boolean that return only last position or each vectors evolutions
    },
    function (e, val) {
        if (e.error)
            console.error(e, val);
        if (e.warn)
            console.warn(e, val);
        console.log("WordLab Logger => ", e, val);
    }.bind(this)
);
var wordLabDataset = DB.trainDataset();

console.log(wordLabDataset.search('second article'));