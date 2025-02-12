import { ControlPoints } from "@/lib/types/control-points";
import { Line } from "@react-three/drei";

export const BoundingLineSegment = ({
  segment,
}: {
  segmentName: number;
  segment: ControlPoints;
}) => (
  <>
    <Line
      points={[segment.startPoint, segment.midPointA]}
      lineWidth={1}
      dashed
      dashSize={0.2} // Length of dashes
      gapSize={0.2} // Space between dashes
      color={segment.color}
      segments
    />
    <Line
      points={[segment.midPointA, segment.midPointB]}
      lineWidth={1}
      dashed
      dashSize={0.2}
      gapSize={0.2}
      color={segment.color}
      segments
    />
    <Line
      points={[segment.midPointB, segment.endPoint]}
      lineWidth={1}
      dashed
      dashSize={0.2}
      gapSize={0.2}
      color={segment.color}
      segments
    />
  </>
);
