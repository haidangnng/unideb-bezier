import * as THREE from "three";
import { Line } from "@react-three/drei";

interface ControlGridLinesProps {
  controlPoints: [number, number, number][];
  size: [number, number];
}

const ControlGridLines: React.FC<ControlGridLinesProps> = ({
  controlPoints,
  size,
}) => {
  const [rows, cols] = size;
  const lines: [THREE.Vector3, THREE.Vector3][] = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const index = i * cols + j;
      const currentPoint = new THREE.Vector3(
        controlPoints[index][0],
        controlPoints[index][1],
        controlPoints[index][2],
      );

      if (j + 1 < cols) {
        const rightIndex = i * cols + (j + 1);
        const rightPoint = new THREE.Vector3(
          controlPoints[rightIndex][0],
          controlPoints[rightIndex][1],
          controlPoints[rightIndex][2],
        );
        lines.push([currentPoint, rightPoint]);
      }

      if (i + 1 < rows) {
        const bottomIndex = (i + 1) * cols + j;
        const bottomPoint = new THREE.Vector3(
          controlPoints[bottomIndex][0],
          controlPoints[bottomIndex][1],
          controlPoints[bottomIndex][2],
        );
        lines.push([currentPoint, bottomPoint]);
      }
    }
  }

  return (
    <>
      {lines.map(([start, end], index) => (
        <Line
          key={index}
          points={[start, end]}
          color="purple"
          lineWidth={0.8}
          dashed
          dashSize={0.3}
          gapSize={0.2}
        />
      ))}
    </>
  );
};

export default ControlGridLines;
