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
var gsap_1 = require("gsap");
var three_orbitcontrols_ts_1 = require("three-orbitcontrols-ts");
var Grid_1 = __importDefault(require("./utilities/Grid"));
var Sphere_1 = __importDefault(require("./utilities/Sphere"));
var Cube_1 = __importDefault(require("./utilities/Cube"));
var Prisme_1 = __importDefault(require("./utilities/Prisme"));
var three_1 = require("three");
var WordLabScene = (function () {
    function WordLabScene(TARGET, DISTANCE, ASPECT, DIVIDER, MULTIPLYER, GRID, CONTROLS) {
        var _this = this;
        this.aspect = window.innerWidth / window.innerHeight;
        this.distance = 200;
        this.PRISMES = [];
        this.SPHERES = [];
        this.ENTRIES = [];
        this.divider = 10;
        this.multiplyer = 1;
        this.render = function () {
            requestAnimationFrame(_this.render);
            _this.controls.target = _this.mesh.position;
            _this.controls.update();
            _this.renderer.render(_this.scene, _this.camera);
        };
        this.addWord = function (pos, name) {
            _this.PRISMES.push(new Prisme_1.default(pos, 8, _this.divider, _this.multiplyer, name, 0xff6666));
            _this.scene.add(_this.PRISMES[_this.PRISMES.length - 1].prisme);
        };
        this.addIndex = function (pos, name) {
            _this.SPHERES.push(new Sphere_1.default(pos, 16, _this.divider, _this.multiplyer, name, 0x5761ff));
            _this.scene.add(_this.SPHERES[_this.SPHERES.length - 1].sphere);
        };
        this.addEntry = function (pos, name) {
            _this.ENTRIES.push(new Cube_1.default(pos, 16, _this.divider, _this.multiplyer, name, 0xfff666));
            _this.scene.add(_this.ENTRIES[_this.ENTRIES.length - 1].cube);
        };
        this.moveCamera = function (pos) {
            gsap_1.TweenMax.to(_this.camera.position, {
                x: pos.x,
                y: pos.y,
                z: pos.z,
                duration: 3,
                delay: 2,
                ease: gsap_1.Power4.easeInOut,
            });
        };
        if (DISTANCE)
            this.distance = DISTANCE;
        if (ASPECT)
            this.aspect = ASPECT;
        if (DIVIDER)
            this.divider = DIVIDER;
        if (MULTIPLYER)
            this.multiplyer = MULTIPLYER;
        this.camera = new THREE.OrthographicCamera(-this.distance * this.aspect, this.distance * this.aspect, this.distance, -this.distance, -100, 100000);
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);
        this.material = new THREE.MeshBasicMaterial({ color: 0x2b2b70 });
        this.geometry = new THREE.BoxGeometry(8, 8, 8);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.mesh.position.z = 0;
        if (GRID) {
            this.grid = new Grid_1.default(1000, 20);
            this.scene.add(this.grid.grid);
        }
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        TARGET.appendChild(this.renderer.domElement);
        if (CONTROLS) {
            this.controls = new three_orbitcontrols_ts_1.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.target = this.mesh.position;
            this.controls.minDistance = 10;
            this.controls.maxDistance = 500;
            this.controls.enablePan = true;
        }
        this.render();
        this.moveCamera(new three_1.Vector3(500, 500, 500));
    }
    return WordLabScene;
}());
module.exports = WordLabScene;
//# sourceMappingURL=Scene.js.map