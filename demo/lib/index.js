"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WordLabDemo_1 = __importDefault(require("./Demos/WordLabDemo"));
document.addEventListener("DOMContentLoaded", function (event) {
    var demo = new WordLabDemo_1.default('https://us-central1-bige-start.cloudfunctions.net/api/articles', window.document.getElementById('WL_container'), null);
});
//# sourceMappingURL=index.js.map