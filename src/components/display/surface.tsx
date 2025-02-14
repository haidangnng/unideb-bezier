import { bezierPatchFunction } from "@/lib/bezier-helpers";
import { useSegmentStore } from "@/lib/store";
import { ControlPoints } from "@/lib/types/control-points";
import { useMemo } from "react";
import { ParametricGeometry } from "three/examples/jsm/geometries/ParametricGeometry.js";

type SurfaceProps = {
  controlPoints: ControlPoints;
  size: [number, number];
};

const Surface: React.FC<SurfaceProps> = ({ controlPoints, size }) => {
  const showWireFrame = useSegmentStore((s) => s.showWireFrame);

  const geometry = useMemo(() => {
    return new ParametricGeometry(
      bezierPatchFunction(controlPoints, size),
      20,
      20,
    );
  }, [controlPoints, size]);

  return (
    <>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="orange" wireframe={showWireFrame} />
      </mesh>
    </>
  );
};

export default Surface;
