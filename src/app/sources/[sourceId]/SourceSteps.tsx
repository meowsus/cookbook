import { Source } from "@/generated/prisma";
import { cn } from "@/lib/helpers";

interface SourceStepsProps {
  source: Source;
}

export default function SourceSteps({ source }: SourceStepsProps) {
  return (
    <ul className="steps steps-horizontal md:steps-vertical">
      <li className={cn("step", source.url && "step-success")}>
        <a href="#url">Add URL</a>
      </li>

      <li className={cn("step", source.fullHtml && "step-success")}>
        <a href="#fullHtml">Fetch HTML</a>
      </li>

      <li className={cn("step", source.processedHtml && "step-success")}>
        <a href="#processedHtml">Process HTML</a>
      </li>

      <li className={cn("step", source.extractedRecipe && "step-success")}>
        <a href="#extractedRecipe">Extract Recipe</a>
      </li>
    </ul>
  );
}
