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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var THREE = __importStar(require("three"));
var Circle_1 = __importDefault(require("./Circle"));
var Sphere = (function () {
    function Sphere(pos, size, divider, multiplyer, name, color) {
        if (size === void 0) { size = 32; }
        this.sphere = new THREE.Group();
        var material = new THREE.MeshBasicMaterial({
            color: color,
            opacity: 0.1,
            transparent: true,
        });
        var geometry = new THREE.SphereGeometry(size, Math.round(size / 2), Math.round(size / 2));
        var sphereInside = new THREE.Mesh(geometry, material);
        this.sphere.add(sphereInside);
        this.sphere.position.x = (pos.x / divider) * multiplyer;
        this.sphere.position.y = (pos.y / divider) * multiplyer;
        this.sphere.position.z = (pos.z / divider) * multiplyer;
        this.sphere.name = name;
        var circle = new Circle_1.default(Math.round(size / 2), size, color).circle;
        var circle2 = new Circle_1.default(Math.round(size / 2), size, color).circle;
        var circle3 = new Circle_1.default(Math.round(size / 2), size, color).circle;
        circle2.rotation.y = Math.PI / 2;
        circle3.rotation.x = Math.PI / 2;
        this.sphere.add(circle);
        this.sphere.add(circle2);
        this.sphere.add(circle3);
    }
    return Sphere;
}());
module.exports = Sphere;
//# sourceMappingURL=Sphere.js.map