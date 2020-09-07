# WordLab

WorldLab est une proposition d'indexation de contenus textuels destinés à une exploitation Front-end.
L'idée globale est de vectoriser des mots pour en déduire les articles les plus proches sur des jeux de donées relativement larges et en un lap de temps très court sans multiplier les appels réseau.

### BETA 0

La beta 0 est abandonnée au profit d'une nouvelle version en cours de ré-écriture.
!important : le package npm actuel est à l'abandon.
Tu peux retrouver des informations sur le projet Beta écrit début 2020 pendant le confinement ici :
https://www.bige.dev/feeds/wordlab-la-base-de-donnee-vectorielle-cree-specialement-pour-bige

### BETA 1

La version en cours d'écriture autorise l'indexation sur 6 couches.
!important : Je ne conseille pas d'utiliser WordLab hors pour des tests avant sa publication en V1.
Les versions BETA ne seront ni maintenues ni durables.
La Beta 1 est entièrement ré-écrite en Typescript pour une meilleure maintenabilité.

Nouveautés BETA1 :

- Verbalisation : detection de verbes et indexation à l'infinitif présent uniquement pour de meilleurs résultats et réduire le poids des indexes.
- Phonetik : ce nouveau module réduit la longeur des indexes par phonétique en langue française
- Syllab : Syllab a été mis à jour pour minimiserl les impacts
- 6eme dimension : les indexes empruntent 6 axes pour multiplier l'indexation de contenus.
- JSON_LT : les schemas standards, article, product et person sont en cours d'implémentation.
- Modes : les indexes peuvent à présent être circulaires ou linéaires pour requêter sur des couches statique comme des tailles ou des prix.
- Les mots sont à présent représentés à plat avant d'être augmentés sur les vecteurs en 6 dimensions.

### demo

une première démo basée sur des articles de Bige.dev  est en cours d'écriture.
cette demonstration n'offre aucun visuel et permet les tests non-statiques sur un jeu de donnée totalement agnostique.

### En cours

N'arrivant pas à me décider sur un compiler il y a beaucoup de code jetable pour le moment.
Le produit est en cours de nettooyage et refacto pour ne retenir que le compiler TSC sans explooitation pure web dans un premier temps.

> La logique mathématique pure est en cours d'écriture.

### bientôt

- une demo augmentée en 3D sur une base d'articles textiles
- 


## Exemple d'exploitation

```

const WordLab = require('../lib/index');
const lab = new WordLab(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles',
    false,
    (name, data) => { console.log('watch ', name, data) },
    "id",
    [
        // list of words to parse and dispatch
        { type: "string", key: "label" },
        { type: "string", key: "short_description" },
        { type: "array", key: "tags" }
    ],
    [
        // define indexed keys props : x, y, z, rx, ry, rz
        { key: "category", type: "string" },
        { key: "publication", type: "date" },
        { key: "tags", type: "array" },
        { key: "author", type: "object", nest: { key: "id", type: "string" } }
        // !important at this time only string and only one level
        // you can add only 2 more indexed level... its suck...
    ],
    [],
    1000,
    false,
    1
)

```