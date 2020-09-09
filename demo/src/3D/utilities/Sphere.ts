import * as THREE from "three";
import Circle from "./Circle";
import Axis from "../../Types/Vector6D";

class Sphere {
    public sphere: THREE.Group;
    constructor(pos: Axis, size: number = 32, divider: number, multiplyer: number, name: string, color: number) {
        this.sphere = new THREE.Group();

        const material = new THREE.MeshBasicMaterial({
            // tslint:disable-next-line: object-literal-shorthand
            color: color,
            opacity: 0.1,
            transparent: true,
        });

        const geometry = new THREE.SphereGeometry(size, Math.round(size / 2), Math.round(size / 2));
        const sphereInside = new THREE.Mesh(geometry, material);
        this.sphere.add(sphereInside);

        this.sphere.position.x = (pos.x / divider) * multiplyer;
        this.sphere.position.y = (pos.y / divider) * multiplyer;
        this.sphere.position.z = (pos.z / divider) * multiplyer;
        this.sphere.name = name;

        const circle = new Circle(Math.round(size / 2), size, color).circle;
        const circle2 = new Circle(Math.round(size / 2), size, color).circle;
        const circle3 = new Circle(Math.round(size / 2), size, color).circle;

        circle2.rotation.y = Math.PI / 2;
        circle3.rotation.x = Math.PI / 2;

        this.sphere.add(circle);
        this.sphere.add(circle2);
        this.sphere.add(circle3);
    }
}
export = Sphere;