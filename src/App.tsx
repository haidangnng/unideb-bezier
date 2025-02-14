import Controller from "./components/control/controller";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ModeToggle } from "./components/theme/mode-toggle";
import Scene from "./components/display/scene";
import DerivativeGraph from "./components/graph";
import { useSegmentStore } from "./lib/store";
import { useMemo } from "react";

function App() {
  const selectedSurfacePoint = useSegmentStore((s) => s.selectedSurfacePoint);
  const normal = useSegmentStore((s) => s.normal);
  const Xu = useSegmentStore((s) => s.Xu);
  const Xv = useSegmentStore((s) => s.Xv);

  const showDerivatives = useMemo(
    () => normal && Xu && Xv && selectedSurfacePoint,
    [Xu, Xv, normal, selectedSurfacePoint],
  );

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

        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <div className="flex h-full items-center justify-center p-6">
                <Scene />
              </div>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={10}>
              <div className="flex h-full items-center justify-center p-6">
                {showDerivatives ? (
                  <DerivativeGraph
                    selectedPoint={selectedSurfacePoint}
                    normal={normal}
                    Xu={Xu}
                    Xv={Xv}
                  />
                ) : (
                  <p>Create Curves and Select a point</p>
                )}
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
