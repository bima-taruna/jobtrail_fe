import { JobTimelines } from "@/app/definitions/job-timelines";
import {
  Stepper,
  StepperContent,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperNav,
  StepperPanel,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/app/ui/components/stepper";
import { formatDate } from "@/lib/utils";
import { Check, LoaderCircleIcon } from "lucide-react";

type JobTimelineProps = {
  timelines: JobTimelines[];
};

export default function JobDetailTimeline({ timelines }: JobTimelineProps) {
  if (!timelines || timelines.length < 1) return <p>timelines not found</p>;
  return (
    <div className="flex items-center justify-center">
      <Stepper
        className="flex flex-col items-start justify-center gap-10"
        defaultValue={timelines.length}
        orientation="vertical"
        indicators={{
          completed: <Check className="size-4" />,
          loading: <LoaderCircleIcon className="size-4 animate-spin" />,
        }}
      >
        <StepperNav>
          {timelines.map((timeline, index) => (
            <StepperItem
              key={index}
              step={index + 1}
              loading={index === 2}
              className="relative items-start not-last:flex-1"
            >
              <StepperTrigger className="items-start pb-12 last:pb-0 gap-2.5">
                <StepperIndicator className="data-[state=completed]:bg-green-500 data-[state=completed]:text-white data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=inactive]:text-gray-500">
                  {index + 1}
                </StepperIndicator>
                <div className="mt-0.5 text-left">
                  <StepperTitle>{timeline.event_type}</StepperTitle>
                  <StepperDescription>
                    {formatDate(timeline.event_date.toString())}
                  </StepperDescription>
                </div>
              </StepperTrigger>
              {index < timelines.length - 1 && (
                <StepperSeparator className="absolute inset-y-0 top-7 left-3 -order-1 m-0 -translate-x-1/2 group-data-[orientation=vertical]/stepper-nav:h-[calc(100%-2rem)] group-data-[state=completed]/step:bg-green-500" />
              )}
            </StepperItem>
          ))}
        </StepperNav>

        <StepperPanel className="text-sm w-56 text-center">
          {timelines.map((timeline, index) => (
            <StepperContent key={index} value={index + 1}>
              Step {timeline.event_type} content
            </StepperContent>
          ))}
        </StepperPanel>
      </Stepper>
    </div>
  );
}
