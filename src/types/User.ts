import Vector6D from '../types/Vector6D';
export default interface User {
  id: number;
  index: number;
  value: string;
  pos: Vector6D;
  orientation: Vector6D;
}
