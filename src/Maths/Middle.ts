import Vector3D from '../types/Vector3D';

export const Middle = (points: Vector3D[]) => {
  const middle: Vector3D = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0 };
  points.forEach((point: Vector3D) => {
    middle.x += point.x;
    middle.y += point.y;
    middle.z += point.z;
    middle.rx += point.rx;
    middle.ry += point.ry;
    middle.rz += point.rz;
  });
  middle.x = middle.x / points.length;
  middle.y = middle.y / points.length;
  middle.z = middle.z / points.length;
  middle.rx = middle.rx / points.length;
  middle.ry = middle.ry / points.length;
  middle.rz = middle.rz / points.length;
  return middle;
};
