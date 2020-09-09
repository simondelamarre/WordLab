/**
 * attempt...
 */

import WordLabDemo from "./Demos/WordLabDemo";

document.addEventListener("DOMContentLoaded", (event) => {
    const demo = new WordLabDemo(
        'https://us-central1-bige-start.cloudfunctions.net/api/articles', // demo api get dataset
        window.document.getElementById('WL_container'), // target container
        null // WLparams default values
    );
});
