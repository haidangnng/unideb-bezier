import { useSegmentStore } from "@/lib/store";
import { ControlPoints } from "@/lib/types/control-points";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useCallback } from "react";

type SegmentControllerProps = {
  selectedSegment: number;
  segment: ControlPoints;
};

const SegmentController: React.FC<SegmentControllerProps> = ({
  selectedSegment,
  segment,
}) => {
  const { startPoint, midPointA, midPointB, endPoint } = segment;
  const updateSegment = useSegmentStore((state) => state.updateSegment);

  const handleChange = useCallback(
    (index: number, value: string, name: string) => {
      const targetPoint = segment[name];

      targetPoint[index] = +value;

      updateSegment(selectedSegment, {
        ...segment,
        [name]: targetPoint,
      });
    },
    [segment, selectedSegment, updateSegment],
  );

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label>Start point: </Label>
        <div className="flex gap-2">
          {startPoint.map((v, i) => (
            <Input
              key={i}
              value={v}
              type="number"
              onChange={(e) => handleChange(i, e.target.value, e.target.name)}
              name="startPoint"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Mid point A: </Label>
        <div className="flex gap-2">
          {midPointA.map((v, i) => (
            <Input
              key={i}
              value={v}
              type="number"
              onChange={(e) => handleChange(i, e.target.value, e.target.name)}
              name="midPointA"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Mid point B: </Label>
        <div className="flex gap-2">
          {midPointB.map((v, i) => (
            <Input
              key={i}
              value={v}
              type="number"
              onChange={(e) => handleChange(i, e.target.value, e.target.name)}
              name="midPointB"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label>End point: </Label>
        <div className="flex gap-2">
          {endPoint.map((v, i) => (
            <Input
              key={i}
              value={v}
              type="number"
              onChange={(e) => handleChange(i, e.target.value, e.target.name)}
              name="endPoint"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SegmentController;
