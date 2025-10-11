import { getSourceProgress } from "@/lib/helpers/source";
import { Source } from "../../../generated/prisma";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { cn } from "@/lib/helpers";

interface SourceProgressProps {
  source: Source;
  className?: string;
}

export default function SourceProgress({
  source,
  className,
}: SourceProgressProps) {
  const sourceProgress = getSourceProgress(source);

  const classes = cn("progress w-full", {
    "progress-success": sourceProgress === 100,
    "progress-warning": sourceProgress < 100,
    className,
  });

  if (sourceProgress === 100) {
    return (
      <div className="flex items-center gap-2">
        <progress
          className={classes}
          value={100}
          max="100"
          title="You have completed all steps"
        ></progress>

        <CheckCircleIcon className="size-4 text-success" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <progress
        className={classes}
        value={sourceProgress}
        max="100"
        title="You still have to work on this source"
      ></progress>

      <ClockIcon className="size-4 text-warning" />
    </div>
  );
}
