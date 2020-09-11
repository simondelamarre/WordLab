import * as THREE from "three";
import Axis from "../../Types/Vector6D";
declare class Sphere {
    sphere: THREE.Group;
    constructor(pos: Axis, size: number, divider: number, multiplyer: number, name: string, color: number);
}
export = Sphere;
