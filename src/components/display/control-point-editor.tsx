import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
import { ControlPoint } from "./control-point";
import { TransformControls } from "@react-three/drei";
import { useSegmentStore } from "@/lib/store";
import { Object3D } from "three";
import { useSnapshot } from "valtio";
import { modes, state } from "@/lib/store/mesh";

const ControlPointEditor = ({
  removeSelectedPoint,
}: {
  removeSelectedPoint?: () => void;
}) => {
  const controlPoints = useSegmentStore((s) => s.controlPoints);
  const updateControlPoints = useSegmentStore((s) => s.updateControlPoints);
  const { scene } = useThree();

  const selectedControlPointRef = useRef<Object3D | null>();

  const snap = useSnapshot(state);

  useEffect(() => {
    if (snap.current) {
      selectedControlPointRef.current = scene.getObjectByName(
        `${snap.current}`,
      );
    }
  }, [removeSelectedPoint, scene, snap]);

  const onTransformChange = useCallback(() => {
    if (selectedControlPointRef.current) {
      updateControlPoints(
        snap.current || 0,
        selectedControlPointRef.current.position.toArray() as [
          number,
          number,
          number,
        ],
      );
    }
  }, [snap, updateControlPoints]);

  const onTransformEnd = () => (state.current = null);

  return (
    <>
      {controlPoints.map((point, index) => (
        <ControlPoint
          key={index}
          idName={`${index}`}
          position={point}
          controlPointIndex={index}
        />
      ))}

      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(`${snap.current}`)}
          mode={modes[snap.mode] as "translate" | "rotate" | "scale"}
          onObjectChange={onTransformChange}
          onMouseUp={onTransformEnd}
        />
      )}
    </>
  );
};

export default ControlPointEditor;
