/**
 * a => b weight such as distance
 * @param a Vector3D
 * @param b Vector3D
 */

import Vector3D from "../types/Vector3D"

export const distance = (a: Vector3D, b: Vector3D) => {
    return Math.sqrt(
        (a.x - b.x) * (a.x - b.x) +
        (a.y - b.y) * (a.y - b.y) +
        (a.z - b.z) * (a.z - b.z)
    );
};
