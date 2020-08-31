/**
 * each subindex allow large files to reduce indexes in small processes 
 * that's the almost basic way to process in research by zero to hero
 */


import Vector3D from "../types/Vector3D"
export default interface SubIndex {
    id: number, index: number, label: string, pos: Vector3D
}