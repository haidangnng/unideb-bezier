import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Surface from "./surface";
import { useSegmentStore } from "@/lib/store";
import ControlPointEditor from "./control-point-editor";
import ControlGridLines from "./control-grid-line";
import Derivatives from "./derivatives";

const Scene = () => {
  const controlPoints = useSegmentStore((s) => s.controlPoints);
  const selectedSurfacePoint = useSegmentStore((s) => s.selectedSurfacePoint);
  const showConnectingLine = useSegmentStore((s) => s.showConnectingLine);
  const normal = useSegmentStore((s) => s.normal);
  const Xu = useSegmentStore((s) => s.Xu);
  const Xv = useSegmentStore((s) => s.Xv);
  const size = useSegmentStore((s) => s.size);

  return (
    <Canvas
      className="flex-1 w-4/5"
      id="canvas"
      dpr={window.devicePixelRatio}
      camera={{
        position: [0, 5, 20],
        near: 0.01,
        far: 100,
        fov: 45,
      }}
    >
      <ambientLight intensity={2} />
      <gridHelper args={[20, 20]} />
      <OrbitControls makeDefault />

      <ControlPointEditor />

      {!!controlPoints.length && (
        <>
          <Surface controlPoints={controlPoints} size={size} />
          {showConnectingLine && (
            <ControlGridLines controlPoints={controlPoints} size={size} />
          )}
        </>
      )}

      {/* Display Derivatives only when a point is selected */}
      {!!controlPoints.length && selectedSurfacePoint && (
        <Derivatives
          selectedPoint={selectedSurfacePoint}
          normal={normal}
          Xu={Xu}
          Xv={Xv}
        />
      )}
    </Canvas>
  );
};

export default Scene;
