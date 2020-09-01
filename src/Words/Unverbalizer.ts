/**
 * Detect verbs from the 100 most popular french verbs
 * undo conjugation and return original verb
 * @param str : string 
 */
const groups = {
    "group1": {
        er: ["e", "es", "ons", "ez", "ent", "é", "ais", "ait", "ions", "iez", "aient", "ai", "as", "a", "âmes", "âtes", "èrent", "erai", "eras", "era", "erons", "erez", "eront", "erais", "erait", "erions", "eriez", "eraient", "asse", "asses", "ât", "assions", "assiez", "assent", "er", "ant"],
    },
    "group2": {
        ir: ["is", "it", "issons", "issez", "issent", "i", "issais", "issait", "issions", "issiez", "issaient", "îmes", "îtes", "irent", "irai", "iras", "ira", "irons", "irez", "iront", "irais", "irait", "irions", "iriez", "iraient", "isse", "isses", "ît", "ir", "issant"],
    },
    "group3": {
        oir: ["ois", "oit", "oyons", "oyez", "oient", "u", "oyais", "oyait", "oyions", "oyiez", "oyaient", "is", "it", "îmes", "îtes", "irent", "errai", "erras", "erra", "errons", "errez", "erront", "errais", "errait", "errions", "erriez", "erraient", "oie", "oies", "isse", "isses", "ît", "issions", "issiez", "issent", "oir", "oyant"],
        irregular: ["abattre", "absoudre", "abstenir", "acheter", "accroître", "accueillir", "acquérir", "aller", "apercevoir", "apparaître", "appartenir", "appeler", "apprécier", "apprendre", "assaillir", "asseoir", "assiéger", "atteindre", "avoir", "battre", "boire", "bouillir", "broyer", "céder", "clore", "combattre", "commencer", "comparaître", "comprendre", "compromettre", "concevoir", "conclure", "concourir", "conduire", "confire", "connaître", "conquérir", "construire", "contenir", "contredire", "convaincre", "convenir", "coudre", "courir", "couvrir", "craindre", "croire", "croître", "cueillir", "cuire", "déceler", "décevoir", "découvrir", "décrire", "déduire", "défaire", "déplaire", "détruire", "devenir", "devoir", "dire", "disparaître", "dissoudre", "distraire", "dormir", "éclore", "écrire", "élire", "émettre", "employer", "enclore", "enfuir", "entreprendre", "entretenir", "envoyer", "équivaloir", "éteindre", "être", "exclure", "extraire", "faillir", "faire", "falloir", "feindre", "fuir", "geler", "haïr", "haleter", "harceler", "inclure", "inscrire", "instruire", "interdire", "intervenir", "introduire", "jeter", "joindre", "lancer", "lever", "lire", "luire", "maintenir", "manger", "méconnaître", "médire", "méprendre", "mettre", "modeler", "moudre", "mourir", "mouvoir", "naître", "nuire", "obtenir", "offrir", "omettre", "ouvrir", "paître", "paraître", "parcourir", "parvenir", "payer", "peindre", "peler", "percevoir", "permettre", "peser", "placer", "plaindre", "plaire", "pleuvoir", "poursuivre", "pourvoir", "pouvoir", "prédire", "prendre", "prescrire", "prévaloir", "prévenir", "prévoir", "promettre", "recevoir", "reconnaître", "recueillir", "réduire", "rejoindre", "renaître", "renvoyer", "résoudre", "restreindre", "revoir", "rire", "rompre", "satisfaire", "savoir", "séduire", "sentir", "servir", "souffrir", "soumettre", "sourire", "souscrire", "soutenir", "souvenir", "suffire", "suivre", "surprendre", "survenir", "survivre", "taire", "taire", "teindre", "tenir", "transcrire", "transmettre", "tressaillir", "vaincre", "valoir", "venir", "vêtir", "vivre", "voir", "vouloir"],
    }
}
export const unverbalizer = (str: string) => {
    for (const o of groups.group3.oir)
        if (str.length >= o.length && str.substring(str.length - o.length, str.length) === o)
            str.replace(o, "oir");

    for (const o of groups.group2.ir)
        if (str.length >= o.length && str.substring(str.length - o.length, str.length) === o)
            str.replace(o, "ir");

    for (const o of groups.group1.er)
        if (str.length > o.length && str.substring(str.length - o.length, str.length) === o)
            str.replace(o, "er");

    return str;
}