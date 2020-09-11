"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var THREE = __importStar(require("three"));
var Circle = (function () {
    function Circle(segmentCount, radius, color) {
        var geometry2 = new THREE.Geometry();
        var material2 = new THREE.LineBasicMaterial({ color: color });
        for (var i = 0; i <= segmentCount; i++) {
            var theta = (i / segmentCount) * Math.PI * 2;
            geometry2.vertices.push(new THREE.Vector3(Math.cos(theta) * radius, Math.sin(theta) * radius, 0));
        }
        this.circle = new THREE.Line(geometry2, material2);
    }
    return Circle;
}());
module.exports = Circle;
//# sourceMappingURL=Circle.js.map