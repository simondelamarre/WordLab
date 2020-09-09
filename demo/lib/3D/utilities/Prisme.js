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
var Prisme = (function () {
    function Prisme(pos, size, divider, multiplyer, name, color) {
        this.prisme = new THREE.Group();
        this.geometry = new THREE.SphereGeometry(size, 6, 6);
        var material = new THREE.MeshBasicMaterial({
            color: color,
            opacity: 0.6,
            wireframe: false,
            transparent: true,
        });
        var cube = new THREE.Mesh(this.geometry, material);
        cube.name = name;
        this.prisme.add(cube);
        this.prisme.position.x = (pos.x / divider) * multiplyer;
        this.prisme.position.y = (pos.y / divider) * multiplyer;
        this.prisme.position.z = (pos.z / divider) * multiplyer;
        this.prisme.name = name;
    }
    return Prisme;
}());
module.exports = Prisme;
//# sourceMappingURL=Prisme.js.map