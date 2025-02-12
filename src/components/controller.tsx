import { useSegmentStore } from "@/lib/store";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SegmentController from "./segment-controller";
import { Button } from "./ui/button";

const Controller: React.FC = () => {
  const segments = useSegmentStore((state) => state.segments);
  const addRandomSegment = useSegmentStore((state) => state.addRandomSegment);
  const removeSegments = useSegmentStore((state) => state.removeSegments);
  const showSegmentLine = useSegmentStore((state) => state.showSegmentLine);
  const playAnimation = useSegmentStore((state) => state.playAnimation);

  const setPlayAnimation = useSegmentStore((state) => state.setPlayAnimation);
  const setShowSegmentLine = useSegmentStore(
    (state) => state.setShowSegmentLine,
  );

  return (
    <div className="flex flex-col h-full pb-4">
      <div className="p-2 flex-1">
        <Accordion type="single" collapsible>
          {segments.map((segment, indx) => (
            <div key={indx}>
              <AccordionItem value={`seg-${indx}`}>
                <AccordionTrigger>Segments {indx + 1}</AccordionTrigger>
                <AccordionContent>
                  <SegmentController segment={segment} selectedSegment={indx} />
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>
      </div>

      <div className="flex flex-col gap-2 px-4">
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="playAnimation"
            checked={playAnimation}
            onCheckedChange={(v) => setPlayAnimation(!!v)}
          />
          <label
            htmlFor="playAnimation"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Play Animation
          </label>
        </div>
        <div className="flex items-center gap-x-2">
          <Checkbox
            id="showSegmentLine"
            checked={showSegmentLine}
            onCheckedChange={(v) => setShowSegmentLine(!!v)}
          />
          <label
            htmlFor="showSegmentLine"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Show segment line
          </label>
        </div>

        <Button onClick={addRandomSegment}>Add Random Point</Button>
        <Button onClick={removeSegments}>Clear All</Button>
      </div>
    </div>
  );
};

export default Controller;
