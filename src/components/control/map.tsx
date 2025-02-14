import { useSegmentStore } from "@/lib/store";
import { useRef, useEffect, useState } from "react";

const Map: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const setSelectedSurfacePoint = useSegmentStore(
    (state) => state.setSelectedSurfacePoint,
  );

  const [selectedPoint, setSelectedPoint] = useState<{
    u: number;
    v: number;
  } | null>(null);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ccc";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    if (selectedPoint) {
      const x = selectedPoint.u * canvas.width;
      const y = selectedPoint.v * canvas.height;

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  useEffect(() => {
    drawCanvas();
  }, [selectedPoint]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const u = (event.clientX - rect.left) / rect.width;
    const v = (event.clientY - rect.top) / rect.height;

    setSelectedPoint({ u, v });
    setSelectedSurfacePoint(v, u);
  };

  return (
    <div className="w-5/6 aspect-square border border-black box-border m-2 mx-auto p-4">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        onClick={handleClick}
        className="w-full h-full bg-gray-200 cursor-pointer"
      />
    </div>
  );
};

export default Map;
