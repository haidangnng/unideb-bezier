import { Vector3, Vector3Tuple } from "three";

const point = new Vector3();
const p0 = new Vector3();
const p1 = new Vector3();
const p2 = new Vector3();
const p3 = new Vector3();

const cubicBezierP0 = (t: number, p: number) => {
  const k = 1 - t;
  return k * k * k * p;
};

const cubicBezierP1 = (t: number, p: number) => {
  const k = 1 - t;
  return 3 * k * k * t * p;
};

const cubicBezierP2 = (t: number, p: number) => 3 * (1 - t) * t * t * p;

const cubicBezierP3 = (t: number, p: number) => t * t * t * p;

const cubicBezier = (
  t: number,
  p0: number,
  p1: number,
  p2: number,
  p3: number,
) =>
  cubicBezierP0(t, p0) +
  cubicBezierP1(t, p1) +
  cubicBezierP2(t, p2) +
  cubicBezierP3(t, p3);

export const getCubicBezierPoint = (
  pStart: Vector3Tuple,
  midA: Vector3Tuple,
  midB: Vector3Tuple,
  pEnd: Vector3Tuple,
  t: number,
) => {
  p0.fromArray(pStart);
  p1.fromArray(midA);
  p2.fromArray(midB);
  p3.fromArray(pEnd);
  point.set(
    cubicBezier(t, p0.x, p1.x, p2.x, p3.x),
    cubicBezier(t, p0.y, p1.y, p2.y, p3.y),
    cubicBezier(t, p0.z, p1.z, p2.z, p3.z),
  );

  return point.clone();
};
