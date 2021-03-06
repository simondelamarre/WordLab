/**
 * each subindex allow large files to reduce indexes in small processes
 * that's the almost basic way to process in research by zero to hero
 * @param id : numberid => UUIDV4 id todo swicth as uuid tye format
 * @param index : integer => small integer
 * @param label : string =>part from json file to index
 * @param pos : Vector6D => vector 3D dispathed position
 */

import Vector6D from '../types/Vector6D';
import Axis from '../types/Axis';
export default interface SubIndex {
  label: string | number | null;
  pos: Vector6D | null;
  axis: Axis | null;
}
