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
var Cube = (function () {
    function Cube(pos, size, divider, multiplyer, name, color) {
        if (size === void 0) { size = 8; }
        this.cube = new THREE.Group();
        var material = new THREE.MeshBasicMaterial({
            color: color,
            opacity: 0.6,
            wireframe: false,
            transparent: true,
        });
        var geometry = new THREE.BoxGeometry(size, size, size);
        var cube = new THREE.Mesh(geometry, material);
        cube.name = name;
        this.cube.add(cube);
        this.cube.position.x = (pos.x / divider) * multiplyer;
        this.cube.position.y = (pos.y / divider) * multiplyer;
        this.cube.position.z = (pos.z / divider) * multiplyer;
        ;
        this.cube.name = name;
    }
    return Cube;
}());
module.exports = Cube;
//# sourceMappingURL=Cube.js.map