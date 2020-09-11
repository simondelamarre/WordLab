import * as THREE from "three";
// import gsap from "gsap";
import { TweenMax, Power4 } from "gsap";
// import { BufferGeometryUtils } from "three/examples/jsm/utils/BufferGeometryUtils.js";
// import { OrbitControls } from "./utilities/OrbitControl";
import { OrbitControls } from 'three-orbitcontrols-ts';

import Grid from "./utilities/Grid";
import Axis from "../Types/Vector6D";
import Sphere from "./utilities/Sphere";
import Cube from "./utilities/Cube";
import Prisme from "./utilities/Prisme";
import { Vector3 } from "three";

class WordLabScene {
    private aspect: number = window.innerWidth / window.innerHeight;
    private distance: number = 200;
    public camera: THREE.OrthographicCamera;
    public scene: THREE.Scene;
    // private material: THREE.MeshBasicMaterial;
    private geometry: THREE.BoxBufferGeometry;
    private mesh: THREE.LineSegments;
    private grid: Grid;
    // private gridV: Grid;
    private renderer: THREE.WebGLRenderer;
    private controls: OrbitControls;

    public PRISMES: Prisme[] = [];
    public SPHERES: Sphere[] = [];
    public ENTRIES: Cube[] = [];

    private divider: number = 10;
    private multiplyer: number = 1;

    constructor(
        TARGET: HTMLElement,
        DISTANCE: number | null,
        ASPECT: number | null,
        DIVIDER: number | null,
        MULTIPLYER: number | null,
        GRID: boolean | null,
        CONTROLS: boolean | null,
    ) {
        if (DISTANCE) this.distance = DISTANCE;
        if (ASPECT) this.aspect = ASPECT;
        if (DIVIDER) this.divider = DIVIDER;
        if (MULTIPLYER) this.multiplyer = MULTIPLYER;
        this.camera = new THREE.OrthographicCamera(
            -this.distance * this.aspect,
            this.distance * this.aspect,
            this.distance,
            -this.distance,
            -100,
            100000
        );
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0xffffff);

        this.geometry = new THREE.BoxBufferGeometry(32, 32, 32);
        const edges = new THREE.EdgesGeometry(this.geometry);
        this.mesh = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: 0x2b2b70 }));
        // scene.add(line);

        /* this.material = new THREE.MeshBasicMaterial({ color: 0x2b2b70 });
        this.geometry = new THREE.BoxGeometry(32, 32, 32); */

        // this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
        this.mesh.position.z = 0;
        if (GRID) {
            this.grid = new Grid(1000, 20);
            this.scene.add(this.grid.grid);

            /* this.gridV = new Grid(1000, 20);
            this.scene.add(this.gridV.grid);
            this.gridV.grid.rotateX(180) */
        }

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        TARGET.appendChild(this.renderer.domElement);

        if (CONTROLS) {
            this.controls = new OrbitControls(this.camera, this.renderer.domElement);
            this.controls.target = this.mesh.position;
            this.controls.minDistance = 10;
            this.controls.maxDistance = 500;
            this.controls.enablePan = true;
        }

        this.render();
        this.moveCamera(new Vector3(500, 500, 500));
    }
    private render = () => {
        requestAnimationFrame(this.render);
        this.controls.target = this.mesh.position;
        this.controls.update();

        // TODO ADD and replace labels on screen
        /* for (let cat of this.WordLabOutput.category) {
            if (cat.label && document.getElementById(cat.label) !== null) {
                document.getElementById(cat.label).style.top =
                    this.toScreenPosition(this.scene.getObjectByName(cat.label)).y +
                    "px";
                document.getElementById(cat.label).style.left =
                    this.toScreenPosition(this.scene.getObjectByName(cat.label)).x -
                    document.getElementById(cat.label).offsetWidth / 2 +
                    "px";
            }
        } */

        this.renderer.render(this.scene, this.camera);
    }
    public addWord = (pos: Axis, name: string) => {
        this.PRISMES.push(new Prisme(pos, 8, this.divider, this.multiplyer, name, 0xff6666));
        this.scene.add(this.PRISMES[this.PRISMES.length - 1].prisme);
    }
    public addIndex = (pos: Axis, name: string) => {
        this.SPHERES.push(new Sphere(pos, 16, this.divider, this.multiplyer, name, 0x5761ff));
        this.scene.add(this.SPHERES[this.SPHERES.length - 1].sphere);
    }
    public addEntry = (pos: Axis, name: string) => {
        this.ENTRIES.push(new Cube(pos, 16, this.divider, this.multiplyer, name, 0xfff666));
        this.scene.add(this.ENTRIES[this.ENTRIES.length - 1].cube);
    }
    public moveCamera = (pos: Vector3) => {
        TweenMax.to(this.camera.position, {
            x: pos.x,
            y: pos.y,
            z: pos.z,
            duration: 3,
            delay: 2,
            ease: Power4.easeInOut,
        });
    }
    public moveTarget = (pos: Vector3) => {
        TweenMax.to(this.mesh.position, {
            x: (pos.x / this.divider) * this.multiplyer,
            y: (pos.y / this.divider) * this.multiplyer,
            z: (pos.z / this.divider) * this.multiplyer,
            duration: 1,
            ease: Power4.easeInOut,
        });
    }
}
export = WordLabScene;