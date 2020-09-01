import Vector3D from "../types/Vector3D"
export default interface Word {
    value: string,
    token: string,
    pos: Vector3D,
    weight: number
}
