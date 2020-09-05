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

export const distanceWithAxis = (a: Vector3D, b: Vector3D) => {
    return Math.sqrt(
        (a.x - b.x) * (a.x - b.x) +
        (a.y - b.y) * (a.y - b.y) +
        (a.z - b.z) * (a.z - b.z) +
        (a.rx - b.rx) * (a.rx - b.rx) +
        (a.ry - b.ry) * (a.ry - b.ry) +
        (a.rz - b.rz) * (a.rz - b.rz)
    );
};

export const distanceWithParams = (
    a: Vector3D,
    b: Vector3D,
    request: {
        x: boolean,
        y: boolean,
        z: boolean,
        rx: boolean,
        ry: boolean,
        rz: boolean
    }
) => {
    let x = (a.x - b.x) * (a.x - b.x);
    let y = (a.y - b.y) * (a.y - b.y);
    let z = (a.z - b.z) * (a.z - b.z);

    let rx = (a.rx - b.rx) * (a.rx - b.rx);
    let ry = (a.ry - b.ry) * (a.ry - b.ry);
    let rz = (a.rz - b.rz) * (a.rz - b.rz);

    if (!request.x) x = 0;
    if (!request.y) y = 0;
    if (!request.z) z = 0;
    if (!request.rx) rx = 0;
    if (!request.ry) ry = 0;
    if (!request.rz) rz = 0;

    return Math.sqrt(
        x + y + z + rx + ry + rz
    );
};


