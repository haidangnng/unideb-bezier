import { Canvas } from "@react-three/fiber";
import { BezierCurveEditor } from "./components/bezier-curve-editor";
import { OrbitControls } from "@react-three/drei";
import Controller from "./components/controller";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import CurveFunc from "./components/curve-func";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <div className="h-screen w-screen relative">
      <div className="absolute right-4 top-4 z-10">
        <ModeToggle />
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel maxSize={25} defaultValue={20}>
          <Controller />
        </ResizablePanel>

        <ResizableHandle />

        <ResizablePanel>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel>
              <Canvas
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

                <BezierCurveEditor />
              </Canvas>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={20}>
              <CurveFunc />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
