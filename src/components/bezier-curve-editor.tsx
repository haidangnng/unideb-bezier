import { useState, useRef, useCallback, Fragment, useEffect } from "react";
import { TransformControls } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { Mesh, Object3D } from "three";
import { ControlPointName, ControlPoints } from "@/lib/types/control-points";
import { useAnimation } from "@/lib/hooks/useAnimation";
import { updateCurve } from "@/lib/utils";
import { ControlPoint } from "./control-point";
import { useSegmentStore } from "@/lib/store";
import { BezierLineSegment } from "./bezier-line-segment";
import { BoundingLineSegment } from "./bounding-line-segment";

export const BezierCurveEditor = () => {
  const { scene } = useThree();

  const segments = useSegmentStore((state) => state.segments);
  const updateSegment = useSegmentStore((state) => state.updateSegment);

  const [selectedControlPoint, setSelectedControlPoint] =
    useState<ControlPointName | null>(null);

  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const selectedCurve = useRef<Object3D | null>();
  const prevSegmentCurve = useRef<Object3D | null>();
  const selectedControlPointRef = useRef<Object3D | null>();
  const newControlPoints = useRef<ControlPoints | null>(null);
  const prevSegmentControlPoints = useRef<ControlPoints | null>(null);
  const showSegmentLine = useSegmentStore((state) => state.showSegmentLine);

  const testObj = useRef<Mesh | null>(null);

  useAnimation(testObj);

  const onControlPointSelect = useCallback(
    (name: ControlPointName, segmentIndex: number, idName: string) => {
      setSelectedSegment(segmentIndex);
      setSelectedControlPoint(name);
      selectedControlPointRef.current = scene.getObjectByName(idName);
      selectedCurve.current = scene.getObjectByName(segmentIndex.toString());
      prevSegmentCurve.current =
        name === "startPoint"
          ? scene.getObjectByName((segmentIndex - 1).toString())
          : null;
    },
    [scene],
  );

  const onTransformChange = useCallback(() => {
    if (
      selectedControlPoint &&
      selectedSegment !== null &&
      selectedControlPointRef.current
    ) {
      newControlPoints.current = {
        ...segments[selectedSegment],
        [selectedControlPoint]:
          selectedControlPointRef.current.position.toArray(),
      };
      if (selectedCurve.current && newControlPoints.current) {
        updateCurve(newControlPoints.current, selectedCurve);
      }
      if (prevSegmentCurve.current) {
        prevSegmentControlPoints.current = {
          ...segments[selectedSegment - 1],
          endPoint: selectedControlPointRef.current.position.toArray(),
        };
        if (prevSegmentControlPoints.current) {
          updateCurve(prevSegmentControlPoints.current, prevSegmentCurve);
        }
      }
    }
  }, [segments, selectedControlPoint, selectedSegment]);

  const onTransformEnd = useCallback(() => {
    if (newControlPoints.current && selectedSegment !== null) {
      updateSegment(selectedSegment, newControlPoints.current);
      newControlPoints.current = null;
      selectedCurve.current = null;
      selectedControlPointRef.current = null;
      if (prevSegmentCurve.current && prevSegmentControlPoints.current) {
        updateSegment(selectedSegment - 1, prevSegmentControlPoints.current);
        prevSegmentControlPoints.current = null;
        prevSegmentCurve.current = null;
      }
    }
    if (testObj.current) testObj.current.visible = true;
  }, [selectedSegment, updateSegment]);

  const deselect = useCallback(() => {
    setSelectedSegment(null);
    setSelectedControlPoint(null);
  }, []);

  useEffect(() => {
    if (segments.length < 1) deselect();
  }, [segments, deselect]);

  return (
    <>
      {segments.map((segment: ControlPoints, segmentIndex: number) => (
        <group key={segmentIndex}>
          <BezierLineSegment segmentName={segmentIndex} segment={segment} />
          {showSegmentLine && (
            <BoundingLineSegment segmentName={segmentIndex} segment={segment} />
          )}
          {Object.keys(segment).map((controlPoint) => {
            if (controlPoint === "color") return null;
            const identificationName = `${segmentIndex}-${controlPoint}`;
            return (
              <Fragment key={identificationName}>
                {(segmentIndex + 1 === segments.length ||
                  controlPoint !== "endPoint") && (
                  <ControlPoint
                    idName={identificationName}
                    position={segment[controlPoint as ControlPointName]}
                    name={controlPoint as ControlPointName}
                    segmentIndex={segmentIndex}
                    selectedSegment={selectedSegment}
                    selectedControlPoint={selectedControlPoint}
                    deselect={deselect}
                    onControlPointSelect={onControlPointSelect}
                  />
                )}
              </Fragment>
            );
          })}
        </group>
      ))}

      {selectedControlPoint && segments.length > 0 && (
        <TransformControls
          object={scene.getObjectByName(
            `${selectedSegment}-${selectedControlPoint}`,
          )}
          mode="translate"
          onObjectChange={onTransformChange}
          onMouseUp={onTransformEnd}
          onMouseDown={() => {
            if (testObj.current) testObj.current.visible = false;
          }}
        />
      )}

      <mesh
        ref={testObj}
        position={segments[0] ? [...segments[0].startPoint] : [0, 0, 0]}
      >
        <sphereGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="yellow" />
      </mesh>
    </>
  );
};
