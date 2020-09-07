import Axis from '../types/Axis';
import Vector3D from '../types/Vector3D';

export default interface Word {
  // value: string, // perhaps we need to get origin but don't know why for minified version...
  token: string;
  pos: Vector3D;
  weight: number;
}
