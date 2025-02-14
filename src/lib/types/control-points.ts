import { Vector3Tuple } from "three";

export type ControlPointName =
  | "startPoint"
  | "endPoint"
  | "midPointA"
  | "midPointB";

export type ControlPoints = Vector3Tuple[];
