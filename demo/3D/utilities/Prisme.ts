import * as THREE from "three";
import Axis from "../../../src/types/Vector6D";

class Prisme {
    public prisme: THREE.Group;
    private geometry: THREE.SphereGeometry = new THREE.SphereGeometry(2, 1, 1);
    constructor(pos: Axis, divider: number, multiplyer: number, name: string, color: number) {
        this.prisme = new THREE.Group();

        const material = new THREE.MeshBasicMaterial({
            // tslint:disable-next-line: object-literal-shorthand
            color: color,
            opacity: 0.6,
            wireframe: false,
            transparent: true,
        });
        const cube = new THREE.Mesh(this.geometry, material);
        cube.name = name;
        this.prisme.add(cube);

        this.prisme.position.x = (pos.x / divider) * multiplyer;
        this.prisme.position.y = (pos.y / divider) * multiplyer;
        this.prisme.position.z = pos.z / divider;
        this.prisme.name = name;
    }
}
export = Prisme