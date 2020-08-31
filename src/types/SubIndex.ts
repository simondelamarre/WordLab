/**
 * each subindex allow large files to reduce indexes in small processes 
 * that's the almost basic way to process in research by zero to hero
 * id UUIDV4 id 
 * index small integer
 * label string part from json file to index
 * po vector 3D dispathed position
 */


import Vector3D from "../types/Vector3D"
export default interface SubIndex {
    id: number, index: number, label: string, pos: Vector3D
}