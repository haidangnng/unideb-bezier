import * as THREE from "three";
import { ControlPoints } from "./types/control-points";

const bernstein = (n: number, i: number, t: number): number => {
  const binomial = (n: number, k: number): number =>
    factorial(n) / (factorial(k) * factorial(n - k));
  return binomial(n, i) * Math.pow(t, i) * Math.pow(1 - t, n - i);
};

const factorial = (
  (cache: Record<number, number> = {}) =>
  (n: number): number => {
    if (n <= 1) return 1;
    if (cache[n]) return cache[n];
    return (cache[n] = n * factorial(n - 1));
  }
)();

export const bezierPatchFunction =
  (controlPoints: ControlPoints, size: [number, number]) =>
  (u: number, v: number, target: THREE.Vector3): [number, number, number] => {
    const [rows, cols] = size;
    let x = 0,
      y = 0,
      z = 0;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const bernsteinU = bernstein(rows - 1, i, u);
        const bernsteinV = bernstein(cols - 1, j, v);
        const weight = bernsteinU * bernsteinV;

        const index = i * cols + j;
        x += weight * controlPoints[index][0];
        y += weight * controlPoints[index][1];
        z += weight * controlPoints[index][2];
      }
    }

    target.set(x, y, z);
    return [x, y, z];
  };

export const bezierPatchDerivatives = (
  u: number,
  v: number,
  controlPoints: [number, number, number][],
  rows: number,
  cols: number,
): { Xu: THREE.Vector3; Xv: THREE.Vector3; normal: THREE.Vector3 } => {
  const Xu = new THREE.Vector3(0, 0, 0);
  const Xv = new THREE.Vector3(0, 0, 0);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const dBernsteinU = bernsteinDerivative(rows - 1, i, u);
      const dBernsteinV = bernsteinDerivative(cols - 1, j, v);

      const index = i * cols + j;
      const point = new THREE.Vector3(
        controlPoints[index][0],
        controlPoints[index][1],
        controlPoints[index][2],
      );

      Xu.addScaledVector(point, dBernsteinU * bernstein(cols - 1, j, v));

      Xv.addScaledVector(point, dBernsteinV * bernstein(rows - 1, i, u));
    }
  }

  const normal = new THREE.Vector3().crossVectors(Xu, Xv).normalize();

  return { Xu, Xv, normal };
};

export const bernsteinDerivative = (n: number, i: number, t: number) => {
  return n * (bernstein(n - 1, i - 1, t) - bernstein(n - 1, i, t));
};
