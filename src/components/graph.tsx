import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Vector3 } from "three";
import { useEffect, useState } from "react";

type DerivativeGraphProps = {
  selectedPoint: Vector3 | null;
  normal?: Vector3 | null;
  Xu?: Vector3 | null;
  Xv?: Vector3 | null;
};

const DerivativeGraph: React.FC<DerivativeGraphProps> = ({
  selectedPoint,
  normal,
  Xu,
  Xv,
}) => {
  const [data, setData] = useState<
    { name: string; x: number; y: number; z: number }[]
  >([]);

  useEffect(() => {
    if (selectedPoint && normal && Xu && Xv) {
      setData([
        { name: "Xu", x: Xu.x, y: Xu.y, z: Xu.z },
        { name: "Xv", x: Xv.x, y: Xv.y, z: Xv.z },
        { name: "Normal", x: normal.x, y: normal.y, z: normal.z },
      ]);
    }
  }, [selectedPoint, normal, Xu, Xv]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="x" stroke="#ff0000" name="X Component" />
        <Line type="monotone" dataKey="y" stroke="#00ff00" name="Y Component" />
        <Line type="monotone" dataKey="z" stroke="#0000ff" name="Z Component" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DerivativeGraph;
