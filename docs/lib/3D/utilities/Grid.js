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
var Grid = (function () {
    function Grid(size, divider) {
        if (size === void 0) { size = 1000; }
        if (divider === void 0) { divider = 20; }
        this.grid = new THREE.Group();
        var material = new THREE.LineBasicMaterial({
            color: 0xcccccc,
            linecap: "round",
        });
        var points = [];
        var geometry;
        var line;
        for (var i = 0; i < divider + 1; i++) {
            points.push(new THREE.Vector3(-size, 0, 0));
            points.push(new THREE.Vector3(size, 0, 0));
            geometry = new THREE.BufferGeometry().setFromPoints(points);
            line = new THREE.Line(geometry, material);
            line.position.z = ((size * 2) / divider) * i - size;
            this.grid.add(line);
        }
        for (var i = 0; i < divider + 1; i++) {
            points = [];
            points.push(new THREE.Vector3(0, 0, -size));
            points.push(new THREE.Vector3(0, 0, size));
            geometry = new THREE.BufferGeometry().setFromPoints(points);
            line = new THREE.Line(geometry, material);
            line.position.x = ((size * 2) / divider) * i - size;
            this.grid.add(line);
        }
        material = new THREE.LineBasicMaterial({
            color: 0x2b2b70,
            linecap: "round",
            linewidth: 10
        });
        points = [];
        points.push(new THREE.Vector3(size / 10, 0, 0));
        points.push(new THREE.Vector3(size / 10, 0, size / 10));
        points.push(new THREE.Vector3(0, 0, size / 10));
        points.push(new THREE.Vector3(-size / 10, 0, 0));
        points.push(new THREE.Vector3(-size / 10, 0, -size / 10));
        points.push(new THREE.Vector3(0, 0, -size / 10));
        points.push(new THREE.Vector3(size / 10, 0, 0));
        geometry = new THREE.BufferGeometry().setFromPoints(points);
        line = new THREE.Line(geometry, material);
        line.position.y = 1;
        this.grid.add(line);
        var blackMaterial = new THREE.MeshBasicMaterial({ color: 0x2b2b70 });
        var BoxGeometry1 = new THREE.BoxGeometry(1, 400, 1);
        var line1 = new THREE.Mesh(BoxGeometry1, blackMaterial);
        this.grid.add(line1);
        var BoxGeometry2 = new THREE.BoxGeometry(400, 1, 1);
        var line2 = new THREE.Mesh(BoxGeometry2, blackMaterial);
        this.grid.add(line2);
        var BoxGeometry3 = new THREE.BoxGeometry(1, 1, 400);
        var line3 = new THREE.Mesh(BoxGeometry3, blackMaterial);
        this.grid.add(line3);
    }
    return Grid;
}());
module.exports = Grid;
//# sourceMappingURL=Grid.js.map