import create from "zustand";
import { ControlPoints } from "../types/control-points";
import { initPoints } from "../utils";
import { Vector3Tuple, Vector3 } from "three";
import {
  bezierPatchFunction,
  bezierPatchDerivatives,
} from "@/lib/bezier-helpers";

export interface SegmentsState {
  selectedSurfacePoint: Vector3 | null;
  selectedUV: [number, number] | null;
  size: [number, number];
  controlPoints: ControlPoints;
  showWireFrame: boolean;
  showConnectingLine: boolean;
  Xu: Vector3 | null;
  Xv: Vector3 | null;
  normal: Vector3 | null;
}

interface SegmentsAction {
  createNewControlPoints: (x: number, y: number) => void;
  removeControlPoints: () => void;
  setShowWireFrame: (v: boolean) => void;
  setShowConnectingLine: (v: boolean) => void;
  updateControlPoints: (i: number, np: Vector3Tuple) => void;
  setSelectedSurfacePoint: (u: number, v: number) => void;
}

export const useSegmentStore = create<SegmentsState & SegmentsAction>(
  (set, get) => ({
    selectedSurfacePoint: null,
    selectedUV: null,
    size: [0, 0],
    controlPoints: [],
    showWireFrame: true,
    showConnectingLine: true,
    Xu: null,
    Xv: null,
    normal: null,

    removeControlPoints: () => set({ controlPoints: [] }),

    createNewControlPoints: (r: number, c: number) =>
      set({ controlPoints: initPoints(r, c), size: [r, c] }),

    setSelectedSurfacePoint: (u: number, v: number) => {
      const { controlPoints, size } = get();
      const surfacePoint = new Vector3();
      bezierPatchFunction(controlPoints, size)(u, v, surfacePoint);
      const [rows, cols] = size;
      const { Xu, Xv, normal } = bezierPatchDerivatives(
        u,
        v,
        controlPoints,
        rows,
        cols,
      );
      set({
        selectedSurfacePoint: surfacePoint,
        selectedUV: [u, v],
        Xu,
        Xv,
        normal,
      });
    },
    setShowWireFrame: (v: boolean) => set({ showWireFrame: v }),
    setShowConnectingLine: (v: boolean) => set({ showConnectingLine: v }),
    updateControlPoints: (index: number, newPosition: Vector3Tuple) => {
      set((state) => {
        const updatedControlPoints = [...state.controlPoints];
        updatedControlPoints[index] = newPosition;

        if (state.selectedUV) {
          const [u, v] = state.selectedUV;
          const surfacePoint = new Vector3();
          bezierPatchFunction(updatedControlPoints, state.size)(
            u,
            v,
            surfacePoint,
          );
          const { Xu, Xv, normal } = bezierPatchDerivatives(
            u,
            v,
            updatedControlPoints,
            state.size[0],
            state.size[1],
          );

          return {
            controlPoints: updatedControlPoints,
            selectedSurfacePoint: surfacePoint,
            Xu,
            Xv,
            normal,
          };
        }

        return { controlPoints: updatedControlPoints };
      });
    },
  }),
);
