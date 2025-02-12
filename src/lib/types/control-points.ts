import { Vector3Tuple } from "three";

export type ControlPointName =
  | "startPoint"
  | "endPoint"
  | "midPointA"
  | "midPointB";

export interface ControlPoints {
  startPoint: Vector3Tuple;
  endPoint: Vector3Tuple;
  midPointA: Vector3Tuple;
  midPointB: Vector3Tuple;
  color: string;
}
