import * as THREE from "three";
import Axis from "../../Types/Vector6D";
declare class Prisme {
    prisme: THREE.Group;
    private geometry;
    constructor(pos: Axis, size: number, divider: number, multiplyer: number, name: string, color: number);
}
export = Prisme;
