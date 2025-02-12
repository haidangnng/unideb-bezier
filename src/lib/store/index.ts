import create from "zustand";
import { ControlPoints } from "../types/control-points";
import { getRandomBrightColor, getRandomPoint } from "../utils";

export interface SegmentsState {
  segments: ControlPoints[];
  playAnimation: boolean;
  showSegmentLine: boolean;
}

interface SegmentsAction {
  updateSegment: (segmentIndex: number, newPoints: ControlPoints) => void;
  addRandomSegment: () => void;
  removeSegments: () => void;
  setPlayAnimation: (v: boolean) => void;
  setShowSegmentLine: (v: boolean) => void;
}

export const useSegmentStore = create<SegmentsState & SegmentsAction>(
  (set) => ({
    segments: [
      {
        startPoint: [-2, -2, 1],
        midPointA: [-1, 1, 4],
        midPointB: [1, -1, -4],
        endPoint: [2, 2, -1],
        color: getRandomBrightColor(),
      },
    ],
    playAnimation: true,
    showSegmentLine: true,
    updateSegment: (segmentIndex: number, newPoints: ControlPoints) =>
      set((state: SegmentsState) => {
        const newSegments = [...state.segments];
        newSegments[segmentIndex] = {
          ...newSegments[segmentIndex],
          ...newPoints,
        };
        return {
          segments: newSegments,
        };
      }),
    addRandomSegment: () =>
      set((state: SegmentsState) => {
        const newSegments = [...state.segments];
        newSegments.push({
          startPoint: newSegments[newSegments.length - 1]?.endPoint || [
            0, 0, 0,
          ],
          endPoint: getRandomPoint(),
          midPointA: getRandomPoint(),
          midPointB: getRandomPoint(),
          color: getRandomBrightColor(),
        });
        return { segments: newSegments };
      }),
    removeSegments: () => set({ segments: [] }),
    setPlayAnimation: (v: boolean) => set({ playAnimation: v }),
    setShowSegmentLine: (v: boolean) => set({ showSegmentLine: v }),
  }),
);
