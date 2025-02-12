import { useSegmentStore } from "@/lib/store";
import { useMemo } from "react";

const CurveFunc = () => {
  const segments = useSegmentStore((state) => state.segments);

  const curveFunc = useMemo(() => {
    const str: string[] = [];
    segments.forEach((controlPoints, i) => {
      str.push(
        `B(t${i}) = (1 - t)³(${controlPoints.startPoint}) + 3(1 - t)²t(${controlPoints.midPointA}) + 3(1 - t)t²(${controlPoints.midPointB}) + t³(${controlPoints.endPoint}); \n`,
      );
    });
    return str;
  }, [segments]);

  return (
    <div className="p-4 flex flex-col gap-2">
      {curveFunc.map((v, i) => (
        <p key={i}>{v}</p>
      ))}
    </div>
  );
};

export default CurveFunc;
