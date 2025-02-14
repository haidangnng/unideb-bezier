import { useSegmentStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import InitControl from "./init-control";
import { Button } from "../ui/button";
import Map from "./map";
import { Label } from "../ui/label";

const Controller: React.FC = () => {
  const controlPoints = useSegmentStore((state) => state.controlPoints);
  const removeControlPoints = useSegmentStore(
    (state) => state.removeControlPoints,
  );
  const showWireFrame = useSegmentStore((state) => state.showWireFrame);
  const showConnectingLine = useSegmentStore(
    (state) => state.showConnectingLine,
  );

  const setShowWireFrame = useSegmentStore((state) => state.setShowWireFrame);
  const setShowConnectingLine = useSegmentStore(
    (state) => state.setShowConnectingLine,
  );

  return (
    <div className="flex flex-col h-full pb-4">
      {!controlPoints.length && (
        <div className="p-2 flex-1">
          <InitControl />{" "}
        </div>
      )}

      {!!controlPoints.length && (
        <div className="flex flex-col gap-2 px-4 h-full">
          <div className=" flex flex-col gap-2 flex-1">
            <div>
              <Label>Show derivatives points</Label>
              <Map />
              <div>
                <div className="flex gap-1">
                  <p className="text-red-500">Red</p>
                  <p>Xu (∂X/∂u) – Tangent Vector in the U-direction</p>
                </div>
                <div className="flex gap-1">
                  <p className="text-green-500">Green</p>
                  <p>Xv (∂X/∂v) – Tangent Vector in the v-direction</p>
                </div>
                <div className="flex gap-1">
                  <p className="text-blue-500">Blue</p>
                  <p>Normal (N = Xu × Xv) – Surface Normal Vector</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Checkbox
              id="showWireFrame"
              checked={showWireFrame}
              onCheckedChange={(v) => setShowWireFrame(!!v)}
            />
            <label
              htmlFor="showWireFrame"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show wireframe
            </label>
          </div>

          <div className="flex items-center gap-x-2">
            <Checkbox
              id="showConnectingLine"
              checked={showConnectingLine}
              onCheckedChange={(v) => setShowConnectingLine(!!v)}
            />
            <label
              htmlFor="showConnectingLine"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Show Control Grid Line
            </label>
          </div>

          <Button onClick={removeControlPoints}>Clear All</Button>
        </div>
      )}
    </div>
  );
};

export default Controller;
