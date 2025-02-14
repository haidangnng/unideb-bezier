import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Vector3Tuple } from "three";
import { ControlPoints } from "./types/control-points";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const initPoints = (row: number, col: number, spacing: number = 2) => {
  const controlPoints: ControlPoints = [];

  const centerX = ((col - 1) * spacing) / 2;
  const centerZ = ((row - 1) * spacing) / 2;

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const x = j * spacing - centerX;
      const y = 0;
      const z = i * spacing - centerZ;
      controlPoints.push([x, y, z] as Vector3Tuple);
    }
  }

  return controlPoints;
};

export const getRandomBrightColor = () => {
  const r = Math.floor(Math.random() * 156);
  const g = Math.floor(Math.random() * 156);
  const b = Math.floor(Math.random() * 156);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`.toUpperCase();
};
