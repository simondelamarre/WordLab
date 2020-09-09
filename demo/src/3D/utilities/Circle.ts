import * as THREE from "three";

class Circle {
    public circle: THREE.Line;
    constructor(segmentCount: number, radius: number, color: number) {
        const geometry2 = new THREE.Geometry();
        const material2 = new THREE.LineBasicMaterial({ color: color });
        for (let i = 0; i <= segmentCount; i++) {
            const theta = (i / segmentCount) * Math.PI * 2;
            geometry2.vertices.push(
                new THREE.Vector3(
                    Math.cos(theta) * radius,
                    Math.sin(theta) * radius,
                    0
                )
            );
        }
        this.circle = new THREE.Line(geometry2, material2);
    }
}

export = Circle;