import Axis from '../types/Axis';
import Vector6D from '../types/Vector6D';

export default interface Word {
  // value: string, // perhaps we need to get origin but don't know why for minified version...
  token: string;
  pos: Vector6D;
  weight: number;
}
