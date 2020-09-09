import * as THREE from "three";
import Axis from "../../Types/Vector6D";

class Prisme {
    public prisme: THREE.Group;
    private geometry: THREE.SphereGeometry;
    constructor(pos: Axis, size: number, divider: number, multiplyer: number, name: string, color: number) {
        this.prisme = new THREE.Group();
        this.geometry = new THREE.SphereGeometry(size, 6, 6);
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
        this.prisme.position.z = (pos.z / divider) * multiplyer;
        this.prisme.name = name;
    }
}
export = Prisme