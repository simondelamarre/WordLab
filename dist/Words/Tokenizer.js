"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WordType = require("./WordTypes_FR");
var Syllab_1 = __importDefault(require("./Syllab"));
var Unverbalizer_1 = __importDefault(require("./Unverbalizer"));
exports.default = (function (paragraph) {
    var REGLES = new WordType();
    var cleaned = REGLES.cleanStr(paragraph).split(' ');
    var output = [];
    for (var _i = 0, cleaned_1 = cleaned; _i < cleaned_1.length; _i++) {
        var word = cleaned_1[_i];
        word = Unverbalizer_1.default(word);
        output.push(Syllab_1.default(word.toLowerCase()));
    }
    return output.join('-');
});
