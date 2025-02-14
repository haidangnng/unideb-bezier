import { Vector3Tuple } from "three";
import { useState } from "react";
import { useSnapshot } from "valtio";
import { modes, state } from "@/lib/store/mesh";

interface ControlPointProps {
  idName: string;
  position: Vector3Tuple;
  controlPointIndex: number;
}

export const ControlPoint = ({
  idName,
  position,
  controlPointIndex,
}: ControlPointProps) => {
  const snap = useSnapshot(state);
  const [hovered, setHovered] = useState(false);
  const isSelected = snap.current === controlPointIndex;

  return (
    <mesh
      name={idName}
      position={position}
      onClick={(e) => (
        e.stopPropagation(), (state.current = controlPointIndex)
      )}
      onPointerMissed={(e) => e.type === "click" && (state.current = null)}
      onContextMenu={(e) =>
        snap.current === controlPointIndex &&
        (e.stopPropagation(), (state.mode = (snap.mode + 1) % modes.length))
      }
      onPointerOver={(e) => (e.stopPropagation(), setHovered(true))}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.1, 32]} />
      <meshBasicMaterial
        color={isSelected ? "red" : hovered ? "hotpink" : "purple"}
      />
    </mesh>
  );
};
