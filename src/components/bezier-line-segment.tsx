import { ControlPoints } from "@/lib/types/control-points";
import { CubicBezierLine } from "@react-three/drei";

const lineProps = {
  lineWidth: 2,
  color: "#fa00a0",
};

export const BezierLineSegment = ({
  segmentName,
  segment,
}: {
  segmentName: number;
  segment: ControlPoints;
}) => (
  <CubicBezierLine
    name={segmentName.toString()}
    start={segment.startPoint}
    midA={segment.midPointA}
    midB={segment.midPointB}
    end={segment.endPoint}
    segments={50}
    {...lineProps}
  />
);
