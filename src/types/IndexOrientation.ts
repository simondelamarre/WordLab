/**
 * id: a basic integer index
 * @param label: String => such as display label from key => value
 * @param pos: Vector3D => by index order the  key value is chronologic
 * @param envelop: Integer => define influence of indexes by states thinking 3D
 */

import Axis from '../types/Axis';
export default interface IndexOrientation {
  label: string | number;
  axis: Axis | null;
}
