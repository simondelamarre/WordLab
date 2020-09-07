/**
 * Get weights matches from target point
 * @param point Vector3D
 * @param target []<WordType> include pos:<Vector3D>
 */

import { distanceWithParams } from './distance';
import WordType from '../types/Word';
import Vector3D from '../types/Vector3D';
import Axis from '../types/Axis';

export const NearestNeighbors = (
  point: Vector3D,
  target: WordType[],
  request: {
    x: boolean;
    y: boolean;
    z: boolean;
    rx: boolean;
    ry: boolean;
    rz: boolean;
  },
) => {
  const distances = [];
  for (const item of target) {
    item.weight = distanceWithParams(point, item.pos, {
      x: request.x,
      y: request.y,
      z: request.z,
      rx: request.rx,
      ry: request.ry,
      rz: request.rz,
    });
    distances.push(item);
  }
  return distances.sort((a, b) => a.weight - b.weight);
};
