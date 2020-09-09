import * as THREE from "three";
import Axis from "../../Types/Vector6D";

class Cube {
    public cube: THREE.Group;
    constructor(pos: Axis, size: number = 8, divider: number, multiplyer: number, name: string, color: number) {
        this.cube = new THREE.Group();

        const material = new THREE.MeshBasicMaterial({
            // tslint:disable-next-line: object-literal-shorthand
            color: color,
            opacity: 0.6,
            wireframe: false,
            transparent: true,
        });
        const geometry = new THREE.BoxGeometry(size, size, size);
        const cube = new THREE.Mesh(geometry, material);
        cube.name = name;
        this.cube.add(cube);

        this.cube.position.x = (pos.x / divider) * multiplyer;
        this.cube.position.y = (pos.y / divider) * multiplyer;
        this.cube.position.z = (pos.z / divider) * multiplyer;;

        // group.type = "word";
        this.cube.name = name;
        // group.lookAt(this.camera.position);

        // this.scene.add(group);
    }
}
export = Cube