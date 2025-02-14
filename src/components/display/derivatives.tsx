import { useEffect, useRef } from "react";
import { Vector3, ArrowHelper } from "three";
import { useThree } from "@react-three/fiber";

type DerivativesProps = {
  selectedPoint: Vector3 | null;
  normal?: Vector3 | null;
  Xu?: Vector3 | null;
  Xv?: Vector3 | null;
};

const Derivatives: React.FC<DerivativesProps> = ({
  selectedPoint,
  normal,
  Xu,
  Xv,
}) => {
  const { scene } = useThree();
  const normalRef = useRef<ArrowHelper | null>(null);
  const xuRef = useRef<ArrowHelper | null>(null);
  const xvRef = useRef<ArrowHelper | null>(null);

  useEffect(() => {
    if (!selectedPoint) return;

    if (normalRef.current) scene.remove(normalRef.current);
    if (xuRef.current) scene.remove(xuRef.current);
    if (xvRef.current) scene.remove(xvRef.current);

    if (normal) {
      normalRef.current = new ArrowHelper(
        normal.clone().normalize(),
        selectedPoint.clone(),
        3,
        0x0000ff,
      );
      scene.add(normalRef.current);
    }

    if (Xu) {
      xuRef.current = new ArrowHelper(
        Xu.clone().normalize(),
        selectedPoint.clone(),
        2,
        0xff0000,
      );
      scene.add(xuRef.current);
    }

    if (Xv) {
      xvRef.current = new ArrowHelper(
        Xv.clone().normalize(),
        selectedPoint.clone(),
        2,
        0x00ff00,
      );
      scene.add(xvRef.current);
    }

    return () => {
      if (normalRef.current) scene.remove(normalRef.current);
      if (xuRef.current) scene.remove(xuRef.current);
      if (xvRef.current) scene.remove(xvRef.current);
    };
  }, [selectedPoint, normal, Xu, Xv, scene]);

  return (
    <>
      {selectedPoint && (
        <mesh position={selectedPoint}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="blue" />
        </mesh>
      )}
    </>
  );
};

export default Derivatives;
