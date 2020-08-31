/**
 * id: a basic integer index
 * label: string such as display label from key => value
 * pos: by index order the  key value is chronologic
 * envelop: define influence of indexes by states thinking 3D
 */

import Vector3D from "../types/Vector3D"
export default interface User {
    id: number, label: string, pos: Vector3D, envelop: number
}