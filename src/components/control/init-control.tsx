import { useState, useCallback } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useSegmentStore } from "@/lib/store";

const InitControl = () => {
  const [x, setX] = useState<string>("0");
  const [y, setY] = useState<string>("0");

  const createNewControlPoints = useSegmentStore(
    (s) => s.createNewControlPoints,
  );

  const handleInit = useCallback(() => {
    createNewControlPoints(+x, +y);
  }, [createNewControlPoints, x, y]);

  return (
    <div className="flex flex-col gap-2">
      <Label>Enter control points matrix: </Label>
      <div className="flex items-center gap-2">
        <Input
          type="number"
          min={4}
          max={10}
          placeholder="x"
          className="flex-1"
          value={x}
          onChange={(e) => setX(e.target.value)}
        />
        <p>x</p>
        <Input
          type="number"
          min={4}
          max={10}
          placeholder="y"
          className="flex-1"
          value={y}
          onChange={(e) => setY(e.target.value)}
        />
      </div>

      <Button onClick={handleInit} disabled={!+x || !+y}>
        Init control points
      </Button>
    </div>
  );
};

export default InitControl;
