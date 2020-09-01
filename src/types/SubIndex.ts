/**
 * each subindex allow large files to reduce indexes in small processes 
 * that's the almost basic way to process in research by zero to hero
 * @param id : numberid => UUIDV4 id todo swicth as uuid tye format
 * @param index : integer => small integer
 * @param label : string =>part from json file to index
 * @param pos : Vector3D => vector 3D dispathed position
 */


import Vector3D from "../types/Vector3D"
import Axis from "../types/Axis";
export default interface SubIndex {
    label: string | number | null,
    pos: Vector3D | null,
    axis: Axis | null
}