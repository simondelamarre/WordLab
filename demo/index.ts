/**
 * attempt...
 */

import WordLabDemo from "./Demos/WordLabDemo";

const demo = new WordLabDemo(
    'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
    window.document.getElementsByTagName('body')[0], // target container
    null // WLparams
);