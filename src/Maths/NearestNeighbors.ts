/**
 * Get weights matches from target point
 * @param point Vector3D
 * @param target []<WordType> include pos:<Vector3D>
 */

import { distance } from './distance';
import WordType from "../types/Word";
import Vector3D from "../types/Vector3D"

export const NearestNeighbors = (point: Vector3D, target: [WordType]) => {
    const distances = [];
    for (const item of target) {
        item.weight = distance(point, item.pos);
        distances.push(item);
    }
    return distances.sort((a, b) => a.weight - b.weight);
}