import * as THREE from "three";

class Grid {
    public grid: THREE.Group;
    constructor(size: number = 1000, divider: number = 20) {
        this.grid = new THREE.Group();

        var material = new THREE.LineBasicMaterial({
            color: 0xcccccc,
            linecap: "round",
        });
        for (let i = 0; i < divider + 1; i++) {
            var points = [];
            points.push(new THREE.Vector3(-size, 0, 0));
            points.push(new THREE.Vector3(size, 0, 0));

            var geometry = new THREE.BufferGeometry().setFromPoints(points);
            var line = new THREE.Line(geometry, material);
            line.position.z = ((size * 2) / divider) * i - size;
            // this.scene.add(line);
            this.grid.add(line);
        }

        for (let i = 0; i < divider + 1; i++) {
            points = [];
            points.push(new THREE.Vector3(0, 0, -size));
            points.push(new THREE.Vector3(0, 0, size));
            geometry = new THREE.BufferGeometry().setFromPoints(points);
            line = new THREE.Line(geometry, material);
            line.position.x = ((size * 2) / divider) * i - size;
            // this.scene.add(line);
            this.grid.add(line);
        }
        material = new THREE.LineBasicMaterial({
            color: 0x2b2b70,
            linecap: "round",
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

        const blackMaterial = new THREE.MeshBasicMaterial({ color: 0x2b2b70 });
        const BoxGeometry1 = new THREE.BoxGeometry(1, 400, 1);
        const line1 = new THREE.Mesh(BoxGeometry1, blackMaterial);
        this.grid.add(line1);

        const BoxGeometry2 = new THREE.BoxGeometry(400, 1, 1);
        const line2 = new THREE.Mesh(BoxGeometry2, blackMaterial);
        this.grid.add(line2);

        const BoxGeometry3 = new THREE.BoxGeometry(1, 1, 400);
        const line3 = new THREE.Mesh(BoxGeometry3, blackMaterial);
        this.grid.add(line3);
    }
}
export = Grid;